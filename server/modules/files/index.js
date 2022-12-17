import { log } from "../../libServer.js";
import fs from "fs";
let module = {
    id: "files",
    name: "files",
    load(app, api) {
        app.get(`${api.ModulePath(this)}/user/quota`, (req, res) => {
            if (!fs.existsSync(`${api.UserFs}/user.json`))
                return res.send({
                    error: true
                });
            fs.readFile(`${api.UserFs}/user.json`, (err, data) => {
                if (err) {
                    log(`ERROR: unable to read file ${api.UserFs}/user.json`);
                    return;
                }
                let json = JSON.parse(data.toString());
                res.send({
                    quota: json.quota
                });
            });
        });
    },
    install() { },
    unload() { },
};
export default module;
