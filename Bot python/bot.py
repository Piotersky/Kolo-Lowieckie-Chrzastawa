import asyncio
import json
import os
from unicodedata import name
import discord
from discord.ext import commands
from discord.ext import tasks
from discord import app_commands


class abot(discord.Client):

    def __init__(self):
        super().__init__(
            intents=discord.Intents.default(),
            # command_prefix="=",
        )
        self.synced = False

    async def on_ready(self):
        await tree.sync(
            guild=discord.Object(
                id=999410306142974004
            )
        )
        await bot.change_presence(
            activity=discord.Activity(
                type=discord.ActivityType.watching,
                name="struktury"
            )
        )
        self.synced = True
        print("Bot jest online!")

        while True:

            python_path = "C:/Users/piotr/OneDrive/Pulpit/programowanie/Koło Łowieckie/data/python/"
            struktury_path = "C:/Users/piotr/OneDrive/Pulpit/programowanie/Koło Łowieckie/data/struktury/"

            path = python_path + "/1.txt"

            file = os.path.exists(path)

            if file:

                with open(path, 'r') as f:
                    content = f.read()

                f.close()

                os.remove(path)

                data_file = struktury_path + content + '.json'

                if os.path.exists(data_file) == False:
                    await asyncio.sleep(5)

                with open(data_file, 'r') as f:

                    content = f.read()

                    data_dict = json.loads(content)

                    number = data_dict["number"]
                    rodzaj = data_dict["rodzaj"]
                f.close()

                if rodzaj == "1":
                    rodzaj = "Ambona"
                    channel = bot.get_channel(999685658572496906)

                if rodzaj == "2":
                    rodzaj = "Zwyżka"
                    channel = bot.get_channel(999685864919683122)

                if rodzaj == "3":
                    rodzaj = "Wysiadka"
                    channel = bot.get_channel(1004823240851599420)

                embedVar = discord.Embed(
                    title=rodzaj,
                    description="Dodano nową strukturę",
                    color=0x88000
                )
                embedVar.add_field(
                    name="🔢Numer",
                    value=number,
                    inline=False
                )
                embedVar.set_footer(
                    text='Koło Łowieckie Bot - By PioterSky',
                    icon_url=""
                )

                img_path = struktury_path + number + ".jpg"

                if os.path.exists(img_path) == False:
                    await asyncio.sleep(5)

                file = discord.File(
                    img_path,
                    filename="Struktura.jpg"
                )

                await channel.send(embed=embedVar)
                await channel.send(file=file)

            path = python_path + "2.txt"
            file = os.path.exists(path)

            if file:

                with open(path, 'r') as f:
                    content = f.read()

                f.close()

                os.remove(path)

                polowania_path = "C:/Users/piotr/OneDrive/Pulpit/programowanie/Koło Łowieckie/data/polowania/"

                with open(polowania_path + content + '.json', 'r') as f:

                    content = f.read()

                    data_dict = json.loads(content)

                    numer = data_dict["numer"]
                    data = data_dict["data"]
                    teren = data_dict["teren"]
                    mysliwi = data_dict["mysliwi"]
                    budzet = data_dict["budzet"]
                    dystans = data_dict["dystans"]
                    znalezione_struktury = data_dict["znalezione_struktury"]
                    wynik = data_dict["wynik"]
                f.close()

                numer = "1"

                embedVar = discord.Embed(
                    title="Polowanie",
                    description="Dodano nowe polowanie",
                    color=0x88000
                )
                embedVar.add_field(
                    name="🔢Numer",
                    value=numer,
                    inline=False
                )
                embedVar.add_field(
                    name="📆Data",
                    value=data,
                    inline=False
                )
                embedVar.add_field(
                    name="🧭Teren",
                    value=teren,
                    inline=False
                )
                embedVar.add_field(
                    name="💪Myśliwi",
                    value=mysliwi,
                    inline=False
                )
                embedVar.add_field(
                    name="💸Budżet koła",
                    value=budzet,
                    inline=False
                )
                embedVar.add_field(
                    name="🚲Przejechany dystans",
                    value=dystans,
                    inline=False
                )
                embedVar.add_field(
                    name="🔎Znalezione struktury",
                    value =  znalezione_struktury,#"Ambony: " + numer + "\nZwyżki: " + numer + "\nWysiadki: " + numer,
                    inline=False
                )
                embedVar.add_field(
                    name="📝Wynik łowów",
                    value=numer,
                    inline=False
                )

                embedVar.set_footer(
                    text='Koło Łowieckie Bot - By PioterSky',
                    icon_url=""
                )

                channel = bot.get_channel(999410309108355214)
                channel1 = bot.get_channel(999685658572496906)
                channel2 = bot.get_channel(999685864919683122)
                channel3 = bot.get_channel(1004823240851599420)
                send = "📌Polowanie nr. " + numer

                await channel1.send(send)
                await channel3.send(send)
                await channel2.send(send)
                await channel.send(embed=embedVar)

            await asyncio.sleep(30)
            #print("s")

bot = abot()
tree = app_commands.CommandTree(bot)

@tree.command(name="ping", description="Pong!")
async def self(interation: discord.Interaction):

    await interation.response.send_message(f"Pong!")

bot.run("OTM1MTk4ODA4OTY5NzE5ODEw.GGh0gA.iyZut13QiryPekevIIwbEb1ZTm6Y3YJzxUqDq4")
