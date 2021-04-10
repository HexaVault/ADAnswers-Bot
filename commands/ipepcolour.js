/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 1,
  name: "ipepcolour",
  description: "Explains the colouring of the IP/EP numbers on their respective reset buttons",
  execute(message) {
    message.channel.send(`This is a visual improvement introduced in the web Reality update and adapted into the Android version. \nOnce you have at least 1e50 IP/EP the colour shows if you gain less (red), around the same (white), or more (green) IP/EP than you currently have.`);
  }
};