module.exports = {
    "register": {
        "static": {
            "directory": "",
            "route": "/"
        },
        "view": {
            "dust": {
                "path": "views"
            }
        }
    },
    "harnesses": [
        {
            "route": "map",
            "view": {
                "path": "harness/map.dust"
            }
        }
    ]
};
