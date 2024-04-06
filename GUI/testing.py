# progressbar_module.py
import tkinter as tk
from tkinter import ttk
import customtkinter as ct

def create_progress_bar(master, timeout=6000):  # timeout in milliseconds (6 seconds by default)
    pb = ttk.Progressbar(
        master,
        orient='horizontal',
        mode='indeterminate',
        length=200
    )
    # Place the progress bar
    pb.place(x=50 , y=30)
    pb.start()

    # Schedule the destruction after the specified timeout
    master.after(timeout, lambda: master.destroy())

    return pb

def main():
    root = ct.CTk()
    root.geometry('300x120')
    root.title('Connecting')

    # root.grid()

    pb = create_progress_bar(root)

    root.mainloop()

if __name__ == "__main__":
    main()
