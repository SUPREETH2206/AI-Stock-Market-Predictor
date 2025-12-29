from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # This allows your Next.js frontend to talk to this Python backend

# 1. API to Fetch Live Stock Data (Connects to PriceChart.tsx)
@app.route('/api/stock/<ticker>', methods=['GET'])
def get_stock_data(ticker):
    try:
        # Fetch last 1 year of data
        stock = yf.Ticker(ticker)
        hist = stock.history(period="1y")
        
        # Format data for your Recharts frontend
        data = []
        for date, row in hist.iterrows():
            data.append({
                "date": date.strftime('%Y-%m-%d'),
                "price": row['Close'],
                "volume": row['Volume']
            })
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 2. API for AI Prediction (Connects to AIRecommendation.tsx)
@app.route('/api/predict/<ticker>', methods=['GET'])
def predict_stock(ticker):
    try:
        # Fetch data
        stock = yf.Ticker(ticker)
        hist = stock.history(period="60d") # Use last 60 days for context
        
        # Simple Linear Regression (The "AI" Engine)
        hist['Numbers'] = list(range(0, len(hist)))
        X = hist[['Numbers']]
        y = hist['Close']
        
        model = LinearRegression()
        model.fit(X, y)
        
        # Predict next day
        future_day = [[len(hist) + 1]]
        prediction = model.predict(future_day)[0]
        
        # Determine Buy/Sell Signal
        current_price = hist['Close'].iloc[-1]
        signal = "BUY" if prediction > current_price else "SELL"
        
        return jsonify({
            "ticker": ticker,
            "current_price": round(current_price, 2),
            "predicted_price": round(prediction, 2),
            "signal": signal,
            "confidence": "87%" # Placeholder for model confidence score
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 3. API for Sentiment Analysis (Connects to SentimentAnalysis.tsx)
@app.route('/api/sentiment/<ticker>', methods=['GET'])
def get_sentiment(ticker):
    # In a real app, you would scrape news here. 
    # For now, we simulate realistic sentiment data.
    return jsonify({
        "ticker": ticker,
        "sentiment_score": 0.75, # 0 to 1
        "status": "Positive",
        "news_summary": f"Recent quarterly reports for {ticker} show strong growth."
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
