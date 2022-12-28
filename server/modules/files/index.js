import path from "path";
import { log } from "../../libServer.js";
import fs from "fs";
let module = {
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
        app.get(`${api.ModulePath(this)}/sidebar/categories`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/files/sidebar`)))
                return fs.mkdir(path.resolve(`${api.UserAppData(req)}/files/sidebar`), {
                    recursive: true
                }, (err) => {
                    if (err) {
                        log(`ERROR: unable to make directory: ${api.UserAppData(req)}/files/`);
                        return res.json({
                            error: true
                        });
                    }
                    return res.json([]);
                });
            fs.readFile(path.resolve(`${api.UserAppData(req)}/files/sidebar/categories.json`), (err, data) => {
                if (err) {
                    log(`ERROR: couldn't read ${api.UserAppData(req)}/files/sidebar/categories.json`);
                    return res.json({
                        error: true
                    });
                }
                let json = JSON.parse(data.toString());
                return res.json({
                    categories: json
                });
            });
        });
        app.get(`${api.ModulePath(this)}/sidebar/set/default`, (req, res) => {
            const defaultCategories = [
                {
                    title: "Quick Access",
                    children: [
                        {
                            title: "Home",
                            path: "/"
                        }
                    ]
                }
            ];
            if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/files/sidebar`)))
                return fs.mkdir(path.resolve(`${api.UserAppData(req)}/files/sidebar`), {
                    recursive: true
                }, (err) => {
                    if (err) {
                        log(`ERROR: unable to make directory: ${api.UserAppData(req)}/files/`);
                        return res.json({
                            error: true
                        });
                    }
                    return res.json([]);
                });
            fs.writeFile(path.resolve(`${api.UserAppData(req)}/files/sidebar/categories.json`), JSON.stringify(defaultCategories), (err) => {
                if (err) {
                    log(`ERROR: unable to write the defaults to ${path.resolve(`${api.UserAppData(req)}/files/sidebar/categories.json`)}`);
                    return res.json({
                        error: true
                    });
                }
                return res.json({
                    categories: defaultCategories
                });
            });
        });
    },
    install() { },
    unload() { },
};
export default module;
