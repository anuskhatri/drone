import socketio
import time

sio = socketio.Client()

def alert_received(data):
    print(f"Value of key1: {data}")
    
@sio.event
def connect():
    print('Connected to server')

@sio.on('*')
def catch_all(event, data):
    print(f'Received event: "{event}" with data: {data}')
    # Add your custom logic here based on the received event

@sio.event
def alert(data):
    print(f'Received alert: {data}')
    
@sio.event
def servermessage(data):
    print(data)
    
@sio.event
def disconnect():
    print('Disconnected from server')

sio.connect('http://localhost:5000')

# Perform actions after connecting
# emit_alert_after_delay()

# Keep the script running
try:
    while True:
        pass
except KeyboardInterrupt:
    sio.disconnect()
