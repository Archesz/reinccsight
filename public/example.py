import pandas as pd

def teste():
    df = pd.DataFrame({"Nome": ["Jovi", "Samuca", "Babi", "Danda"]})
    df.to_csv('Example.csv')

teste()