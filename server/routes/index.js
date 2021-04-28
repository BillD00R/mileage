const { Router } = require("express");
const clc = require("cli-color");
const fs = require("fs");
const path = require("path");

const folder = __dirname + "\\..\\controllers";

const router = Router();

router.get("/", (req, res) => res.send("Welcome"));

fs.readdirSync(folder)
    .filter((file) => {
        return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
    })
    .forEach((file) => {
        const absolutePath = path.resolve(folder, path.basename(file, path.extname(file)));
        const controller = require(absolutePath);
        if (process.env.NODE_ENV !== "test") {
            console.log(clc.bgGreen(" ❕") + " =>", clc.blue(`file route "${controller.moduleName()}"`));
        }
        controller.fillRoute(router);
    });

module.exports = router;
