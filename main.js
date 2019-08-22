var itemsDB = [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
];

function createReceipt(items){
	let itemsCount = countItems(items);
	let itemsDetail = getItems(itemsCount, itemsDB);
	return generateReceipt(itemsDetail);
}

// 15:00->5:21
// 统计商品数量
function countItems(items){
	const itemsCount = [];
	const itemsMap = new Map();
	items.forEach(element => {
		itemsMap.set(element, itemsMap.get(element) === undefined ? 1 : (itemsMap.get(element) + 1));
	});
	itemsMap.forEach((value, key) => {
		itemsCount.push({id: key, count: value});
	});
	return itemsCount;
}

// 20:00->3:14
// 通过商品条目获取商品具体信息
function getItems(itemsCount, itemsDB){
	const itemsDetail = [];
	itemsCount.forEach(item => {
		itemsDB.forEach(itemInDB => {
			if(item.id == itemInDB.id){
				itemInDB.count = item.count;
				itemsDetail.push(itemInDB);
			}
		});
	});
	return itemsDetail;
}

// 20:00->1:32
// 计算总价格
function calculateTotal(itemsDetail){
	let totalPrice = 0;
	itemsDetail.forEach(element => {
		totalPrice += (element.count * element.price);
	});
	return totalPrice;
}

// 20:00->15:19
// 渲染单据
function generateReceipt(itemDetail){
	return renderTitel() + renderSeparator() + renderItemDetail(itemDetail) + renderSeparator() + renderTotal(itemDetail);
}

// 渲染Title
function renderTitel(){
	return "Receipts\r\n";
}

// 渲染分隔符
function renderSeparator(){
	return "------------------------------------------------------------\r\n";
}

// 渲染条目块信息
function renderItemDetail(itemsDetail){
	let receipt = "";
	itemsDetail.forEach(element => {
		receipt += renderItemLine(element);
	});
	return receipt;
}

// 渲染条目信息
function renderItemLine(item){
	let result = '';
	result += item.name;
	for(let i = 0; i < (32 - item.name.length); i++){
		result += ' ';
	}
	result += item.price;
	for(let i = 0; i < (11 - (item.price + '').length); i++){
		result += ' ';
	}
	result += item.count;
	result += '\r\n';
	return result;
}

// 渲染总价格信息
function renderTotal(itemsDetail){
	let totalPrice = calculateTotal(itemsDetail);
	return `Price: ${totalPrice}`;
}

module.exports = createReceipt;
