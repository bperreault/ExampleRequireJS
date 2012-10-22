define(["ko", "../models/twitterApi"], function (ko, twitterApi) {

    "use strict";

    var savedLists = [
            { name: "Celebrities", userNames: ['JohnCleese', 'MCHammer', 'StephenFry', 'algore', 'StevenSanderson']},
            { name: "Microsoft people", userNames: ['BillGates', 'shanselman', 'ScottGu']},
            { name: "Tech pundits", userNames: ['Scobleizer', 'LeoLaporte', 'techcrunch', 'BoingBoing', 'timoreilly', 'codinghorror']}
        ],

        TwitterListModel = function (lists, selectedList) {

            this.savedLists = ko.observableArray(lists);

            this.editingList = {
                name: ko.observable(selectedList),
                userNames: ko.observableArray()
            };

            this.userNameToAdd = ko.observable("");

            this.currentTweets = ko.observableArray([]);

            this.findSavedList = function (name) {
                var lists = this.savedLists();
                return ko.utils.arrayFirst(lists, function (list) {
                    return list.name === name;
                });
            };

            this.addUser = function () {
                if (this.userNameToAdd() && this.userNameToAddIsValid()) {
                    this.editingList.userNames.push(this.userNameToAdd());
                    this.userNameToAdd("");
                }
            };

            this.removeUser = function (userName) {
                console.log("remove user", userName);
                this.editingList.userNames.remove(userName)
            }.bind(this);

            this.saveChanges = function () {

                var saveAs, dataToSave, existingSavedList;

                saveAs = prompt("Save as", this.editingList.name());

                if (saveAs) {
                    dataToSave = this.editingList.userNames().slice(0);
                    existingSavedList = this.findSavedList(saveAs);
                    if (existingSavedList) {
                        // Overwrite existing list
                        existingSavedList.userNames = dataToSave;
                    } else {
                        // Add new list
                        this.savedLists.push({
                            name: saveAs,
                            userNames: dataToSave
                        });
                    }
                    this.editingList.name(saveAs);
                }
            };

            this.deleteList = function () {

                var nameToDelete, savedListsExceptOneToDelete;

                nameToDelete = this.editingList.name();

                savedListsExceptOneToDelete = $.grep(this.savedLists(), function (list) {
                    return list.name != nameToDelete
                });

                this.editingList.name(savedListsExceptOneToDelete.length == 0 ? null : savedListsExceptOneToDelete[0].name);
                this.savedLists(savedListsExceptOneToDelete);
            };

            ko.computed(function () {
                // Observe viewModel.editingList.name(), so when it changes (i.e., user selects a different list) we know to copy the saved list into the editing list

                var savedList, userNamesCopy;

                savedList = this.findSavedList(this.editingList.name());

                if (savedList) {
                    userNamesCopy = savedList.userNames.slice(0);
                    this.editingList.userNames(userNamesCopy);
                } else {
                    this.editingList.userNames([]);
                }
            }, this);

            this.hasUnsavedChanges = ko.computed(function () {

                var savedData, editingData;

                if (!this.editingList.name()) {
                    return this.editingList.userNames().length > 0;
                }

                savedData = this.findSavedList(this.editingList.name()).userNames;
                editingData = this.editingList.userNames();
                return savedData.join("|") != editingData.join("|");
            }, this);

            this.userNameToAddIsValid = ko.computed(function () {
                return (this.userNameToAdd() == "") || (this.userNameToAdd().match(/^\s*[a-zA-Z0-9_]{1,15}\s*$/) != null);
            }, this);

            this.canAddUserName = ko.computed(function () {
                return this.userNameToAddIsValid() && this.userNameToAdd() != "";
            }, this);

            // The active user tweets are (asynchronously) computed from editingList.userNames
            ko.computed(function () {
                twitterApi.getTweetsForUsers(this.editingList.userNames(), this.currentTweets);
            }, this);
        };

    return new TwitterListModel(savedLists, "Tech pundits");

});