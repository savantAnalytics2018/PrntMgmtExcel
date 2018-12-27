let xlsxPopulate = require('xlsx-populate');

function addTimeStamp(fullFilePath, res){
    xlsxPopulate.fromFileAsync(fullFilePath)
    .then(function (workbook) {
        let sheets = workbook.sheets();
        sheets.forEach(function (sheet, index) {
            sheet.cell("A1")
                .value(sheet.name() + " " + Date())
                .style({
                    fontColor: 'FF0000',
                    fontSize: 16,
                    numberFormat: "dddd, mmmm dd, yyyy"
                });
        });

        workbook.toFileAsync(fullFilePath);
    });
        res.download(fullFilePath, function (err) {
            if (err){
                console.log(err);
                res.status(404).end();
                return null;
            }
            else {
                res.status(200).end();
            }
        });
}
module.exports = function (app) {
    app.get('/getExcel', function (req, res) {
        let filePath = req.query.filePath;
        let fullFilePath = __dirname + "/" + filePath;
        addTimeStamp(fullFilePath, res);

    });
    app.get('/getPdf', function (req, res) {
        let filePath = req.query.filePath;
        let fullFilePath = __dirname + "/" + filePath;
        res.download(fullFilePath, function (err) {
            if (err){
                console.log(err);
                res.status(404).end();
                return null;
            }
            else {
                res.status(200).end();
            }
        });
    });
};
