import os
import re
import requests
# Use the package we installed
from slack_bolt import App

users_store = {}

# Initializes your app with your bot token and signing secret
app = App(
	token=os.environ.get("PSTEREO_BOT_TOKEN"),
	signing_secret=os.environ.get("PSTEREO_BOT_SIGNING_SECRET")
)

# Add functionality here
@app.event("app_home_opened")
def update_home_tab(client, event, logger):
	try:
	# views.publish is the method that your app uses to push a view to the Home tab
		client.views_publish(
			# the user that opened your app's app home
			user_id=event["user"],
			# the view object that appears in the app home
			view={
			"type": "home",
			"callback_id": "home_view",

			# body of the view
			"blocks": [
			{
				"type": "header",
				"text": {
					"type": "plain_text",
					"text": "Welcome to PstereoBot",
					"emoji": True
				}
			},
			{
				"type": "divider"
			},
			{
				"type": "section",
				"text": {
					"type": "plain_text",
					"text": "Hello! 🤖 I am PstereoBot, team Pstereo's own loyal servant 🛎️ Thank you for visiting",
					"emoji": True
				}
			},
			{
				"type": "divider"
			}
		]
			}
		)
	except Exception as e:
		logger.error(f"Error publishing home tab: {e}")

@app.command("/hello")
def repeat_text(ack, body, client):
	ack()
	client.chat_postEphemeral(text=f"Hello <@{body['user_id']}>!", channel=body["channel_id"], user=body["user_id"])

@app.command("/weather")
def show_weather(ack, say, body, client):
	ack()

	url_no = f"https://api.openweathermap.org/data/2.5/weather?lat=63.4305&lon=10.3951&units=metric&appid=24cba2b2c83c464cc46ba4e3a0a2bc5b"
	url_sl = f"https://api.openweathermap.org/data/2.5/weather?lat=6.9271&lon=79.8612&units=metric&appid=24cba2b2c83c464cc46ba4e3a0a2bc5b"

	weather_no = requests.get(url_no).json()
	weather_sl = requests.get(url_sl).json()
	state_no = weather_no['weather'][0]['main']
	state_sl = weather_sl['weather'][0]['main']
	temp_no = weather_no['main']['temp']
	temp_sl = weather_sl['main']['temp']

	client.chat_postEphemeral(blocks=[
		{ 
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": f":flag-lk: : {state_sl}, with a temperature of precisely {temp_sl} degrees. \n :flag-no: : {state_no}, with a temperature of precisely {temp_no} degrees. \n Sri Lanka leads by {temp_sl - temp_no} :blob_dance:"
			}
		}
		], 
		channel=body["channel_id"], user=body["user_id"])

@app.event("app_mention")
def handle_mention(event,  say):
	message = event['blocks'][0]["elements"][0]["elements"][1]["text"]
	sing = ["can", "you", "sing"]
	if all(x in message for x in sing):
		say("AAaAAAaaaaAAAaaaaa")

# Start your app
if __name__ == "__main__":
	app.start(port=int(os.environ.get("PORT", 3000)))