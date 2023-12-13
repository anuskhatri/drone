import tkinter as tk
import socketio

sio = socketio.Client()

received_message = ""

def update_received_message(message):
    global received_message
    received_message = message
    print(f"Received message: {received_message}")

@sio.event
def messageFromServer(data):
    print(f'Message from server: {data}')
    update_received_message(data)

@sio.event
def connect():
    print('Connected to server')

@sio.event
def disconnect():
    print('Disconnected from server')

def on_close():
    # sio.disconnect()
    root.destroy()

root = tk.Tk()
root.title("Socket.IO Client")

# Button to close the Tkinter window and disconnect from the server
close_button = tk.Button(root, text="Close", command=on_close)
close_button.pack()

sio.connect('http://localhost:6000')

root.mainloop()

# Now, the variable `received_message` will contain the last message received from the server.
print(f"Final received message: {received_message}")
