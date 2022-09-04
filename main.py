import eel
import sqlite3

eel.init('web')

@eel.expose
def getTextForLevel(lvl_id, lang):
    curcor = sqlite3.connect('lvl.bd').cursor()
    curcor.execute(f"SELECT {lang.upper()}_Level FROM level WHERE id={lvl_id}")
    return curcor.fetchall()[0][0]


@eel.expose
def getLangs():
    curcor = sqlite3.connect('keys.bd').cursor()
    curcor.execute(f"PRAGMA table_info(keys);")
    mas = []
    for i in curcor.fetchall()[1:]:
        mas += [i[1]]
    return mas


@eel.expose
def initializationLangArr(mas):
    curcor = sqlite3.connect('keys.bd').cursor()
    curcor.execute(f"SELECT * FROM keys")
    FinalList = []
    for i in curcor.fetchall():
        temp = []
        for j in range(0, len(mas)):
            temp += [(mas[j], i[j + 1])]
        FinalList += [(i[0],dict(temp))]
    return dict(FinalList)


@eel.expose
def getConfig():
    curcor = sqlite3.connect('config.bd').cursor()
    curcor.execute(f"PRAGMA table_info(config);")
    namesList = []
    for i in curcor.fetchall():
        namesList += [i[1]]
    curcor.execute(f"SELECT * FROM config")
    couples = []
    for i, item in enumerate(curcor.fetchall()[0]):
        couples += [(namesList[i],item)]
    return dict(couples)
    
    
@eel.expose
def getRange():
    curcor = sqlite3.connect('range.bd').cursor()
    curcor.execute(f"PRAGMA table_info(range);")
    namesList = []
    for i in curcor.fetchall()[1:]:
        namesList += [i[1]]
    curcor.execute(f"SELECT * FROM range")
    couples = []
    for item in curcor.fetchall():
        couples += [(item[0],dict([(namesList[0],item[1]), (namesList[1],item[2]), (namesList[2],item[3])]))]
    return dict(couples)


@eel.expose
def setConfig(name, value):
    print(f"UPDATE config SET {name}={str(value)}")
    con = sqlite3.connect('config.bd')
    curcor = con.cursor()
    curcor.execute(f"UPDATE config SET {name.lower()}='{str(value).lower()}'")
    con.commit()


@eel.expose
def saveStatistics(statistics):
    con = sqlite3.connect('statistics.bd')
    curcor = con.cursor()
    curcor.execute(f"INSERT INTO statistics VALUES {statistics[0], statistics[1], statistics[2], statistics[3], statistics[4], statistics[5]}")
    con.commit()


@eel.expose
def getStatistics(level):
    curcor = sqlite3.connect('statistics.bd').cursor()
    curcor.execute(f"SELECT * FROM statistics WHERE level={level}")
    FinalList = []
    for num, i in enumerate(curcor.fetchall()[::-1], 1):
        FinalList += [[num, i]]
    return dict(FinalList)


eel.start('main.html', cmdline_args=['--start-fullscreen'])