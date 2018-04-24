(function () {

    const app = {
        init: function () {
            crypto.socket;
            crypto.getData();
        }
    }

    const crypto = {
        socket: socket = io(),
        getData: function () {
            let newPrice = 0;
            this.socket.on('data', function(data){
                crypto.transformData(data);

                

                // var incomingTrade = CCC.TRADE.unpack(data);
                // let item = document.querySelector('#price');
                // item.classList = "";
                // let oldPrice = incomingTrade.P;
        
                // if(oldPrice > newPrice){
                //     price.classList.add('gain');
                //     newPrice = oldPrice;
                // }
                // else if(oldPrice < newPrice){
                //     price.classList.add('lose');
                //     newPrice = oldPrice;
                // }

                // item.innerHTML = newPrice;

                // document.querySelector('iformation-container').appendChild(item)
                
                // document.body.appendChild(item);
            })
        },
        transformData : function (data) {
            let incomingTrade = CCC.TRADE.unpack(data);

            let trade = {
                from : incomingTrade['FSYM'],
                to : incomingTrade['TSYM'],
                exchange : incomingTrade['M'],
                quantity : incomingTrade['Q'],
                price : incomingTrade['P'],
                totalPrice : incomingTrade['TOTAL'],
            }

            let sell = 1,
                buy = 2;

            if(incomingTrade['F'] & sell) {
                trade['type'] = 'SELL';
            }
            else if (incomingTrade['F'] & buy) {
                trade['type'] = "BUY";
            }
            else {
                trade['type'] = 'UNKNOWN';
            }

            this.displayData(trade)
        },
        displayData : function (data) {
            let maxTableSize = 10;

            let table = document.querySelector('.trade')
            let length = table.rows.length;
            let row = table.insertRow(0);

            let exhange = document.createElement('td');
            exhange.appendChild(document.createTextNode(data['exchange']));

            let type = document.createElement('td');
            type.appendChild(document.createTextNode(data['type']));

            let from = document.createElement('td');
            from.appendChild(document.createTextNode(data['from']));

            let to = document.createElement('td');
            to.appendChild(document.createTextNode(data['to']));

            let price = document.createElement('td');
            price.appendChild(document.createTextNode(data['price']));
            price.classList.add('price')

            let amount = document.createElement('td');
            amount.appendChild(document.createTextNode(data['quantity']));

            let total = document.createElement('td');
            total.appendChild(document.createTextNode(Math.round((data['totalPrice']) *100 / 100)));
            total.classList.add('price')

            row.appendChild(exhange);
            row.appendChild(type);
            row.appendChild(from);
            row.appendChild(to);
            row.appendChild(price);
            row.appendChild(amount);
            row.appendChild(total);

            if (length >= (maxTableSize)) {
                table.deleteRow(10)
            }

            let title = document.querySelector('.title-price');
            title.innerHTML = (data.price)

        }
    }

    app.init();

})()