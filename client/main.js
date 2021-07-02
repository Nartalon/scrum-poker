import { Template } from "meteor/templating";
import { COLLECTIONS } from "../imports/collections";
import { SessionProps } from "../imports/sessionProperties";
import * as Common from "../imports/common";

import "../imports/routes.js";
import "../imports/methods.js";

import "./main.html";
import "./session.html";
import "./landing.html";
import "./shareLink.html";
import "./datenschutz.html";

export let sessionsHandle;
export let storiesHandle;
export let liveStatisticsHandle;

Meteor.startup(() => {
    Tracker.autorun(() => {
        const selectedSession = Session.get(SessionProps.SELECTED_SESSION);
        sessionsHandle = Meteor.subscribe(COLLECTIONS.SESSIONS, selectedSession);
        storiesHandle = Meteor.subscribe(COLLECTIONS.STORIES, selectedSession);
        liveStatisticsHandle = Meteor.subscribe(COLLECTIONS.LIVE_STATISTICS);
    });
});

Template.layout.events({
    "click .title"() {
        Router.go("landing");
    },
});

const version = new ReactiveVar("");
Template.layout.onRendered(() => {
    fetch("/revision")
        .then((resp) => resp.text())
        .then((vers) => version.set(vers));
});

Template.layout.helpers({
    userName() {
        return Common.getUserName();
    },
    version() {
        return version.get();
    },
});
