

export interface Filter{
    title:string,
    type: 'checkbox' | 'range' | 'price',
    item? : item[],
    startRange? : string,
    lastRange?:string
}
export interface item{
    label:string,
    name:string,
    value:string,
}
export const moreFilter: Filter[] = [{
    title:"อินเตอร์เน็ต ไวไฟ",
    type: "checkbox", 
    item: [{
        label:"WiFi 5",
        name:"wifi5",
        value:"WiFi5"
    },{
        label:"WiFi 6",
        name:"wifi6",
        value:"WiFi6"
    }],
    
    
},{
    title:"ขนาดของสถานที่",
    type:"checkbox",
    item: [{
        label:"ส่วนตัว",
        name:"private",
        value:"Private"
    },{
        label:"เล็ก",
        name:"small",
        value:"Small"
    },{
        label:"กลาง",
        name:"normal",
        value:"Normal"
    },{
        label:"ใหญ่",
        name:"big",
        value:"Big"
    }],
    
      
},{
    title: "ร้านสะดวกซื้อใกล้ๆ",
    type: "checkbox",
    item: [
        {
            label: "ร้านเบเกอรี่",
            name: "bakery",
            value: "Bakery"
        },
        {
            label: "ร้านขายน้ำ",
            name: "water",
            value: "Water"
        },
        {
            label: "ร้านอาหาร",
            name: "restaurant",
            value: "Restaurant"
        },
        {
            label: "ร้านสะดวกซื้อ",
            name: "convenience_store",
            value: "Convenience Store"
        }
    ]
}
,{
    title:"ราคา",
    type:"price",
    startRange: "เริ่มต้น",
    lastRange: "สิ้นสุด",
      
}]