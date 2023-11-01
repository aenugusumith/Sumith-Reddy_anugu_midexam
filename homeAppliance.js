const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("WELCOMING"),
    SELECT_ITEMS: Symbol("SELECT_ITEMS"),
    UPSELL_ITEM: Symbol("UPSELL_ITEM"),
    TOTAL_CALCULATION: Symbol("TOTAL_CALCULATION"),
    CONFIRM_PURCHASE: Symbol("CONFIRM_PURCHASE"),
});

const itemPrices = {
    "snow shovels": 25,
    "furnace filters": 8,
    "screen": 12,
};

const TAX_RATE = 0.13;

class homeAppliance extends Order {
    constructor(sNumber, sUrl) {
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.items = [];
        this.upsellitem = 0;
        this.totalPrice = 0;
        this.sConfirm = "";
    }

    handleInput(sInput) {
        let aReturn = [];

        switch (this.stateCur) {
            case OrderState.WELCOMING:
                aReturn.push("Welcome to Sumith's Home Appliances Store!");
                aReturn.push("Please visit the page for price details:");
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                aReturn.push("What items would you like to buy (snow shovels, furnace filters, screen)?");
                this.stateCur = OrderState.SELECT_ITEMS;
                break;

            case OrderState.SELECT_ITEMS:
                if (isValidItem(sInput)) {
                    this.items.push(sInput);
                    aReturn.push(`Your item ${sInput} is added to your cart.`);
                    aReturn.push("Would you like to order more items? (Yes/No)");
                } else if (sInput.toLowerCase() === "yes") {
                    aReturn.push("Select from the following items: snow shovels, furnace filters, screen");
                } else if (sInput.toLowerCase() === 'no') {
                    aReturn.push("Would you like to add an upsell item? (Yes/No)");
                    this.stateCur = OrderState.UPSELL_ITEM;
                }else {
                    aReturn.push("We don't have that item at the moment. Please choose from available items.");
                    this.stateCur = OrderState.SELECT_ITEMS;
                }
                break;

            case OrderState.UPSELL_ITEM:
                if (isValidUpsellItem(sInput)) {
                    aReturn.push(`You selected ${sInput} as an upsell item.`);
                    aReturn.push("Proceeding to total calculation.");
                    this.upsellitem = 35;
                    this.stateCur = OrderState.TOTAL_CALCULATION;
                } else if (sInput.toLowerCase() === "yes") {
                    aReturn.push("Select an upsell item: Geeky headlamps, Ear buds.");
                    aReturn.push("Please visit the following page for price details:");
                    aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                    this.stateCur = OrderState.TOTAL_CALCULATION;
                    this.upsellitem = 35;
                } else if (sInput.toLowerCase() === "no") {
                    aReturn.push("You chose not to add an upsell item.");
                    aReturn.push("Proceeding to total calculation.");
                    this.upsellitem = 0;
                    this.stateCur = OrderState.TOTAL_CALCULATION;
                } else{
                    aReturn.push("Invalid upsell item.");
                    this.stateCur = OrderState.UPSELL_ITEM;
                }
                break;
    
            case OrderState.TOTAL_CALCULATION:
                this.totalPrice = calcTotalPrice(this.items) + this.upsellitem;
                const amt = this.totalPrice;
                const tax = this.totalPrice * TAX_RATE;
                const total = this.totalPrice + tax;
                aReturn.push(`Total price: $${amt}`);
                aReturn.push(`Tax amount: $${tax}`);
                aReturn.push(`Your final bill inclusive tax is $${total}.`);
                aReturn.push("Would you like to confirm your purchase? (Yes/No)");
                this.stateCur = OrderState.CONFIRM_PURCHASE;
                break;

            case OrderState.CONFIRM_PURCHASE:
                if (sInput.toLowerCase() === "yes") {
                    aReturn.push("Thank you for your purchase!");

                    aReturn.push(`Your final bill inclusive tax is $${total}.`);
                    aReturn.push("We will text you from 519-123-1234 when your order is ready or if we have questions.");
                    this.isDone(true);
                } else if (sInput.toLowerCase() === "no") {
                    aReturn.push("Your order has been canceled.");
                    this.isDone(true);
                }
                break;
        }

        return aReturn;
    }

    renderForm() {
        return (`<html>

        <head>
            <meta content="text/html; charset=UTF-8" http-equiv="content-type">
            <style type="text/css">
                ol {
                    margin: 0;
                    padding: 0
                }
        
                table td,
                table th {
                    padding: 0
                }
        
                .c6 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 225.7pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c5 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: left;
                    height: 11pt
                }
        
                .c3 {
                    color: #000000;
                    font-weight: 700;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c1 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c0 {
                    color: #202122;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 14.5pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c8 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .c7 {
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin-right: auto
                }
        
                .c4 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: left
                }
        
                .c10 {
                    background-color: #ffffff;
                    max-width: 451.4pt;
                    padding: 72pt 72pt 72pt 72pt
                }
        
                .c9 {
                    color: #202122;
                    font-size: 14.5pt
                }
        
                .c2 {
                    height: 0pt
                }
        
                .title {
                    padding-top: 0pt;
                    color: #000000;
                    font-size: 26pt;
                    padding-bottom: 3pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .subtitle {
                    padding-top: 0pt;
                    color: #666666;
                    font-size: 15pt;
                    padding-bottom: 16pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                li {
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }
        
                p {
                    margin: 0;
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }
        
                h1 {
                    padding-top: 20pt;
                    color: #000000;
                    font-size: 20pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h2 {
                    padding-top: 18pt;
                    color: #000000;
                    font-size: 16pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h3 {
                    padding-top: 16pt;
                    color: #434343;
                    font-size: 14pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h4 {
                    padding-top: 14pt;
                    color: #666666;
                    font-size: 12pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h5 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h6 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    font-style: italic;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
            </style>
        </head>
        
        <body class="c10 doc-content">
            <p class="c8"><span class="c1">For Curbside Pick up:</span></p>
            <p class="c5"><span class="c1"></span></p>
            <p class="c5"><span class="c1"></span></p><a id="t.0798074b88e1aa5175e6499f3f47c117e7b0a70d"></a><a id="t.0"></a>
            <table class="c7">
                <tr class="c2">
                    <td class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c3">Item</span></p>
                    </td>
                    <td class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c3">Cost</span></p>
                    </td>
                </tr>
                <tr class="c2">
                    <td class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c9">Snow Shovels</span></p>
                    </td>
                    <td class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c1">$25</span></p>
                    </td>
                </tr>
                <tr class="c2">
                    <td class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">Furnace filters</span></p>
                    </td>
                    <td class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c1">$8</span></p>
                    </td>
                </tr>
                <tr class="c2">
                    <td class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">Screen for screen door</span></p>
                    </td>
                    <td class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c1">$12</span></p>
                    </td>
                </tr>
            </table>
            <p class="c5"><span class="c1"></span></p>
            <p class="c5"><span class="c1"></span></p>
            <p class="c5"><span class="c1"></span></p><a id="t.48b8ff9bb919365ed1265b08dc76721c9570ece0"></a><a id="t.1"></a>
            <table class="c7">
                <tr class="c2">
                    <th class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c1">Upsell Item</span></p>
                    </th>
                    <th class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c1">Price</span></p>
                    </th>
                </tr>
                <tr class="c2">
                    <td class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c9">Geeky headlamps</span></p>
                    </td>
                    <td class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c1">$35</span></p>
                    </td>
                </tr>
                <tr class="c2">
                    <td class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">Ear buds</span></p>
                    </td>
                    <td class="c6" colspan="1" rowspan="1">
                        <p class="c4"><span class="c1">$35</span></p>
                    </td>
                </tr>
            </table>
            <p class="c5"><span class="c1"></span></p>
        </body>
        
        </html>`

        )
    }
}

function isValidItem(item) {
    const validItems = ["snow shovels", "furnace filters", "screen" ];
    return validItems.includes(item.toLowerCase());
}

function calcTotalPrice(items) {
    let totalPrice = 0;
    for (const item of items) {
        if (itemPrices[item]) {
            totalPrice += itemPrices[item];
        }
    }
    return totalPrice;
}

function isValidUpsellItem(item) {
    const validUpsellItems = ["geeky headlamps", "ear buds"];
    return validUpsellItems.includes(item.toLowerCase());
}

module.exports = homeAppliance;