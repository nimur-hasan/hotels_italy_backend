import { HotelModel } from '../db/hotel';
import { PurchaseModel } from '../db/purchase';
import fs from 'fs'

export const takeBackup = async() => {
    // Sample data for the JSON files
    const data1 = { id: 1, name: 'John Doe2', age: 30 };
    const data2 = { id: 2, name: 'Jane Smith', age: 25 };
    const data3 = { id: 3, name: 'Bob Johnson', age: 40 };

    const Purchases = await PurchaseModel.find()
    console.log(Purchases.length)

    const Medicines = await HotelModel.find()
    console.log(Medicines.length)

    // Creating JSON files
    fs.writeFileSync('src/utils/files/data1.json', JSON.stringify(data1, null, 2));
    fs.writeFileSync('src/utils/files/data2.json', JSON.stringify(data2, null, 2));
    fs.writeFileSync('src/utils/files/data3.json', JSON.stringify(data3, null, 2));
}