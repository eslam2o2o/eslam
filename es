
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>حاسبة السعر اليومي</title>
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background: #1a3846;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .calculator {
            background: #ffffff;
            border-radius: 8px; /* Increased radius for a softer look */
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
            padding: 30px;
            width: 100%;
            max-width: 400px;
            margin: 20px;
        }

        .calculator-header {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
        }

        .calculator-header button {
            background-color: #03557b;
            color: #ffffff;
            border: none;
            border-radius: 12px;
            padding: 14px 28px;
            font-size: 24px;
            font-weight: 700;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .calculator-header button:hover {
            background-color: #5a7bf7;
            transform: scale(1.05);
        }

        .input-group {
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
        }

        .input-group label {
            display: inline-block;
            width: 150px;
            padding: 12px;
            background-color: #0298dc;
            color: #fff;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            margin-left: 10px;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .input-group label:hover {
            background-color: #5a7bf7;
            transform: scale(1.05);
        }

        input {
            flex: 1;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 18px;
            outline: none;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        input:focus {
            border-color: #6e8efb;
            box-shadow: 0 0 8px rgba(110, 142, 251, 0.3);
        }

        button {
            width: 100%;
            padding: 14px;
            border: none;
            border-radius: 10px;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
            margin-bottom: 12px;
        }

        button.calculate-btn {
            background-color: #6e8efb;
        }

        button.calculate-btn:hover {
            background-color: #5a7bf7;
            transform: scale(1.05);
        }

        button.copy-btn {
            background-color: #28a745;
        }

        button.copy-btn:hover {
            background-color: #218838;
            transform: scale(1.05);
        }

        h2 {
            margin-top: 20px;
            font-size: 24px;
            color: #333;
            text-align: center;
            font-weight: 700;
        }

        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div class="calculator">
        <div class="calculator-header">
            <button>حاسبة السعر اليومي</button>
        </div>

        <div class="input-group">
            <label for="monthlyRent">الإيجار الشهري</label>
            <input type="number" id="monthlyRent" placeholder="أدخل الإيجار الشهري">
        </div>

        <div class="input-group">
            <label for="daysInMonth">عدد أيام الشهر</label>
            <input type="number" id="daysInMonth" placeholder="أدخل عدد أيام الشهر">
        </div>

        <div class="input-group">
            <label for="extensionDays">عدد أيام التمديد</label>
            <input type="number" id="extensionDays" placeholder="أدخل عدد أيام التمديد">
        </div>

        <div class="input-group">
            <label for="extensionNightRate">قيمة ليلة التمديد</label>
            <input type="number" id="extensionNightRate" placeholder="أدخل قيمة ليلة التمديد">
        </div>

        <button class="calculate-btn" onclick="calculateRent()">احسب</button>
        <button class="copy-btn hidden" id="copyBtn" onclick="copyResult()">نسخ القيمة</button>

        <h2 id="result"> قيمة الليلة </h2>
    </div>

    <script>
        function calculateRent() {
            const monthlyRent = parseFloat(document.getElementById('monthlyRent').value);
            const daysInMonth = parseFloat(document.getElementById('daysInMonth').value);
            const extensionDays = parseFloat(document.getElementById('extensionDays').value);
            const extensionNightRate = parseFloat(document.getElementById('extensionNightRate').value);

            if (isNaN(monthlyRent) || isNaN(daysInMonth) || isNaN(extensionDays) || isNaN(extensionNightRate) || daysInMonth === 0) {
                alert('يرجى إدخال قيم صحيحة.');
                return;
            }

            const dailyRent = monthlyRent / daysInMonth;
            const totalRent = (dailyRent * daysInMonth) + (extensionNightRate * extensionDays);
            const averageNightlyRate = totalRent / (daysInMonth + extensionDays);

            const resultText = `سعر الليلية الواحدة: ${averageNightlyRate.toFixed(4)}`;
            const resultElement = document.getElementById('result');
            resultElement.innerText = resultText;

            // Show the copy button
            document.getElementById('copyBtn').classList.remove('hidden');
        }

        function copyResult() {
            const resultText = document.getElementById('result').innerText;
            const numericValue = resultText.match(/(\d+\.\d+)/); // Extract numeric part with 4 decimal places
            if (numericValue) {
                navigator.clipboard.writeText(numericValue[0]).then(() => {
                    alert('تم نسخ القيمة إلى الحافظة!');
                }).catch(err => {
                    alert('فشل في نسخ القيمة: ' + err);
                });
            }
        }
    </script>
</body>
</html>
