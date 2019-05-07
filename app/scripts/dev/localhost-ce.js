window.context = {
    "contentId": "do_21274639304327987212211",
    "sid": "R42JWXIknodj9e4JCdQOMZVwTmILb1Vc",
    "user": {
        "id": "6f324db7-32a5-4437-a451-35cf53269aaf",
        "name": "Aditya",
        "email": "aditya@niit.com"
    },
    "framework": 'niit_tv',
    "rootOrgId": "0127053482034872320",
    "channel":"niit-Channel"
};

window.config = {
    baseURL: "",
    corePluginsPackaged: true,
    pluginRepo: "/plugins",
    dispatcher: 'console',
    apislug: '/action',
    nodeDisplayCriterion: {
        contentType: ['Course', 'CourseUnit']
    },
    keywordsLimit: 500,
    editorConfig: {
        "mode": "Edit",
        "contentStatus": "draft",
        "rules": {
            "levels": 7,
            "objectTypes": [{
                "type": "Course",
                "label": "Course",
                "isRoot": true,
                "editable": true,
                "childrenTypes": [
                    "CourseUnit",
                    "Collection",
                    "Resource"
                ],
                "addType": "Editor",
                "iconClass": "fa fa-book"
                },
                {
                "type": "CourseUnit",
                "label": "Course Unit",
                "isRoot": false,
                "editable": true,
                "childrenTypes": [
                    "CourseUnit",
                    "Collection",
                    "Resource"
                ],
                "addType": "Editor",
                "iconClass": "fa fa-folder-o"
                },
                {
                "type": "Collection",
                "label": "Collection",
                "isRoot": false,
                "editable": false,
                "childrenTypes": [],
                "addType": "Browser",
                "iconClass": "fa fa-file-o"
                },
                {
                "type": "Resource",
                "label": "Resource",
                "isRoot": false,
                "editable": false,
                "childrenTypes": [],
                "addType": "Browser",
                "iconClass": "fa fa-file-o"
                }]
        },
        "defaultTemplate": {}
    }
}