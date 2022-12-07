const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: '365test'
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const createProduct = (req,res) =>{

    const year = req.body.year
    const yearWeek = req.body.yearWeek
    const varity = req.body.varity
    const RDCSD = req.body.RDCSD
    const stock2Sale = req.body.stock2Sale
    const season = req.body.season
    const cropYear = req.body.cropYear
    const date = new Date()

    var sql = `INSERT data_rice (Seed_RepDate,Seed_Year,Seeds_YearWeek,Seed_Varity,Seed_RDCSD,Seed_Stock2Sale,Seed_Season,Seed_Crop_Year) VALUES (?,?,?,?,?,?,?,?)`
    try {
        connection.query(
            sql,[date,year,yearWeek,varity,RDCSD,numberWithCommas(stock2Sale),season,cropYear],(err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({message:'Add Products Success'})
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

const readProduct = (req,res) =>{
    var sql = `SELECT *,CAST(replace(Seed_Stock2Sale, ',', '') AS int) AS Stockint FROM data_rice;`
    try {
        connection.query(
            sql, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json({products:results})
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

const updateProduct = (req,res) =>{
    const id = req.body.id
    const year = req.body.year
    const yearWeek = req.body.yearWeek
    const varity = req.body.varity
    const RDCSD = req.body.RDCSD
    const stock2Sale = req.body.stock2Sale
    const season = req.body.season
    const cropYear = req.body.cropYear
    var sql = 'UPDATE data_rice SET Seed_Year = ? , Seeds_YearWeek = ? , Seed_Varity = ? , Seed_RDCSD = ? , Seed_Stock2Sale = ? , Seed_Season = ? , Seed_Crop_Year	= ? WHERE id = ? '
    try {
        connection.query(
            sql, [year, yearWeek,varity,RDCSD,numberWithCommas(stock2Sale),season,cropYear, id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    res.status(200).json({message:"Update Success"})
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}


const deleteProduct = (req,res) =>{
    const id = req.params.id
    var sql = 'DELETE FROM data_rice WHERE id = ?'
    try {
        connection.query(
            sql,[id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                else {
                    res.status(200).json({message:"DELETE Success"})
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

const readProductid = (req,res) =>{
    const id = req.params.id
    var sql = `SELECT *,CAST(replace(Seed_Stock2Sale, ',', '') AS int) AS Stockint FROM data_rice WHERE id = ?`
    try {
        connection.query(
            sql,[id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send(err);
                }
                else {
                    res.status(200).json(results)
                }
            }
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).send();
    }
}

module.exports = {
    createProduct,
    readProduct,
    updateProduct,
    deleteProduct,
    readProductid
};