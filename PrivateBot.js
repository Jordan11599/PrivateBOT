const Discord = require("discord.js");
const client = new Discord.Client();
const token = "";

client.login(token); // Log in token

client.on("ready", () => {
  console.log("Connected as " + client.user.tag);

  //Setting activity: "Now listening to !help"
  client.user.setActivity("!help", { type: "LISTENING" });

  let authChannel = client.channels.cache.get("861967555803348992"); //Change number to bot default annoucement channel
  let informationArray = []; //Global information array
  let botOnline = false; //Variable for on/off

  //Required Variables - Defining when client is ready
  let stampToDate = "Loading. . ."; //Pre-loading message / Date
  let finalTimeStamp = ""; //Unix timestamp
  let embedDate2_ = ""; //Embedded Global Timestamp
  let ifTitle = ""; //Embedded Message
  let imageLink = ""; //Embedded Image Link
  let newDescription = ""; //Embedded Description

  //Regex function to filter unwanted characters in URL links
  function isValidUrl(urlString) {
    const matchPattern =
      /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return matchPattern.test(urlString);
  }

  /*
  Main Embed Templates List:
  (1)   helpEmbed - Help Menu
  (2)   reminderEmbed - Main Event embed, used to react to new events
  (3-8) directEmbed to directEmbedV5 - All 6 custom DM embedded messages
  */
  const helpEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("🌐  PrivateBot")
    .setDescription("Bot Made For Managing Event Reminders")
    .setThumbnail("https://i.imgur.com/nXxO5F3.png")
    .addFields(
      {
        name: "Event Commands 🔎",
        value:
          "```📌!Startupbot\n📌!List\n📌!Create <name> in <time>\n📌!Remove <ID> or <Event Name>\n📌!Help```",
      },
      {
        name: "*Examples:\n• !Create Test Event in 10 minutes/hours/days\n• !Remove Test Event\n• !Remove 861976150632169492*",
        value: "\u200B",
      },
      {
        name: "\u200B",
        value: "**Reminder React Commands** 🔎",
      },
      {
        name: "1️⃣ Event Ready",
        value: "DMs Users",
        inline: true,
      },
      {
        name: "2️⃣ 15 Minutes",
        value: "DMs Users",
        inline: true,
      },
      { name: "3️⃣ 1 Hour", value: "DMs Users", inline: true }
    )
    .setImage(
      "https://media1.tenor.com/images/417b164404395c70a1bbd36b44c1ef10/tenor.gif?itemid=15839692"
    )
    .setFooter(
      "BOT made by @WishyWashy#5280",
      "https://i.imgur.com/ktJBGZo.jpg"
    );

  const reminderEmbed = new Discord.MessageEmbed()
    .setColor("#00FFFF")
    .setTitle("Error!")
    //.setURL("https://thenuel.com") (Optional)
    .setDescription(
      "⏰ React For The Event Reminder Menu \n⚔️ Event Start: " + embedDate2_
    )
    //.setThumbnail("https://i.imgur.com/IgqVUqG.png")
    .addFields({
      name: "👥 Attendees (0)",
    })
    //.setTimestamp(message.createdAt) (Optional - Currently not updating)
    .setFooter();

  const directEmbed = new Discord.MessageEmbed()
    .setColor("#009dff")
    .setTitle("Title")
    //.setURL('https://discord.js.org/') (Optional)
    .setDescription("⏰ Please Select An Alert Time - " + stampToDate)
    .addFields(
      {
        name: "1️⃣ Event Start:",
        value: "\u200B",
        inline: true,
      },
      {
        name: "2️⃣ 15 Minutes Before",
        value: "\u200B",
        inline: true,
      },
      { name: "3️⃣ 1 Hour Before", value: "\u200B", inline: true }
    )
    //.setThumbnail("https://media.giphy.com/media/Hr9NGMN4sNmZ6Xir2p/source.gif") (Optional)
    .setFooter();

  const directEmbedV1 = new Discord.MessageEmbed()
    .setColor("#009dff")
    .setTitle("Title")
    //.setURL('https://discord.js.org/') (Optional)
    .setDescription("⏰ Please Select An Alert Time - " + stampToDate)
    .addFields(
      {
        name: "1️⃣ Event Start",
        value: "\u200B",
        inline: true,
      },
      {
        name: "2️⃣ 15 Minutes Before",
        value: "\u200B",
        inline: true,
      }
    )
    //.setThumbnail("https://media.giphy.com/media/Hr9NGMN4sNmZ6Xir2p/source.gif") (Optional)
    .setFooter();

  const directEmbedV2 = new Discord.MessageEmbed()
    .setColor("#009dff")
    .setTitle("Title")
    //.setURL('https://discord.js.org/') (Optional)
    .setDescription("⏰ Please Select An Alert Time - " + stampToDate)
    .addFields({
      name: "1️⃣ Event Start",
      value: "\u200B",
      inline: true,
    })
    //.setThumbnail("https://media.giphy.com/media/Hr9NGMN4sNmZ6Xir2p/source.gif") (Optional)
    .setFooter();

  const directEmbedV3 = new Discord.MessageEmbed()
    .setColor("#009dff")
    .setTitle("Title")
    //.setURL('https://discord.js.org/') (Optional)
    .setDescription("⏰ Please Select An Alert Time - " + stampToDate)
    .addFields(
      {
        name: "1️⃣ Event Start",
        value: "**4️⃣ 3 Hours Before**",
        inline: true,
      },
      {
        name: "2️⃣ 15 Minutes Before",
        value: "\u200B",
        inline: true,
      },
      { name: "3️⃣ 1 Hour Before", value: "\u200B", inline: true }
    )
    //.setThumbnail("https://media.giphy.com/media/Hr9NGMN4sNmZ6Xir2p/source.gif") (Optional)
    .setFooter();

  const directEmbedV4 = new Discord.MessageEmbed()
    .setColor("#009dff")
    .setTitle("Title")
    //.setURL('https://discord.js.org/') (Optional)
    .setDescription("⏰ Please Select An Alert Time - " + stampToDate)
    .addFields(
      {
        name: "1️⃣ Event Start",
        value: "**4️⃣ 3 Hours Before**",
        inline: true,
      },
      {
        name: "2️⃣ 15 Minutes Before",
        value: "**5️⃣ 6 Hours Before**",
        inline: true,
      },
      { name: "3️⃣ 1 Hour Before", value: "\u200B", inline: true }
    )
    //.setThumbnail("https://media.giphy.com/media/Hr9NGMN4sNmZ6Xir2p/source.gif") (Optional)
    .setFooter();

  const directEmbedV5 = new Discord.MessageEmbed()
    .setColor("#009dff")
    .setTitle("Title")
    //.setURL('https://discord.js.org/') (Optional)
    .setDescription("⏰ Please Select An Alert Time - " + stampToDate)
    .addFields(
      {
        name: "1️⃣ Event Start",
        value: "**4️⃣ 3 Hours Before**",
        inline: true,
      },
      {
        name: "2️⃣ 15 Minutes Before",
        value: "**5️⃣ 6 Hours Before**",
        inline: true,
      },
      { name: "3️⃣ 1 Hour Before", value: "**6️⃣ 1 Day Before**", inline: true }
    )

    //.setThumbnail("https://media.giphy.com/media/Hr9NGMN4sNmZ6Xir2p/source.gif") (Optional)
    .setFooter();

  /*
  Misc Embedded List:
  (1)   messageEmbed - Error message for multiple applications to the same event
  (2)   eventAlreadyStarted - Error message for event not existing
  (3-8) eventStart - Event starting
        eventStartMin | eventStartHour | eventStartThreeHour | eventStartSixHour | eventStartDay
  (9)   listTemplate - Default
  */
  const messageEmbed = new Discord.MessageEmbed()
    .setColor("#808080")
    .setDescription("You Have Already Reacted To This Event");

  const eventAlreadyStarted = new Discord.MessageEmbed()
    .setColor("#CBC3E3")
    .setDescription("Event No Longer Exists");

  const eventStart = new Discord.MessageEmbed()
    .setTitle("Event is Starting")
    .setColor("#3CB043")
    .setDescription("<Text Holder>");

  const eventStartMin = new Discord.MessageEmbed()
    .setTitle("Event in 15 Minutes")
    .setColor("#3CB043")
    .setDescription("<Text Holder>");

  const eventStartHour = new Discord.MessageEmbed()
    .setTitle("Event in 1 Hour")
    .setColor("#3CB043")
    .setDescription("<Text Holder>");

  const eventStartThreeHour = new Discord.MessageEmbed()
    .setTitle("Event in 3 Hours")
    .setColor("#3CB043")
    .setDescription("<Text Holder>");

  const eventStartSixHour = new Discord.MessageEmbed()
    .setTitle("Event in 6 Hours")
    .setColor("#3CB043")
    .setDescription("<Text Holder>");

  const eventStartDay = new Discord.MessageEmbed()
    .setTitle("Event in 1 Day")
    .setColor("#3CB043")
    .setDescription("<Text Holder>");

  const listTemplate = new Discord.MessageEmbed()
    .setDescription("Title")
    .setColor("#00FF00");

  //MAIN FUNCTION
  try {
    client.on("raw", (event) => {
      const eventName = event.t;
      let visableAuthChannels = client.channels.cache.get("862006582308503582"); //Where bot errors go (Optional)

      if (eventName === "MESSAGE_CREATE") {
        //RUNS SECOND
        if (event.d.author.id == "861972357140971571") {
          //Bot ID
          authChannel = client.channels.cache.get(event.d.channel_id);

          if (event.d.channel_id == authChannel.id) {
            //Channel ID

            if (authChannel.messages.cache.has(event.d.id)) return;

            authChannel.messages.fetch(event.d.id).then((message) => {
              if (!message.content) {
                message.embeds.forEach((embed) => {
                  ifTitle = embed;
                });
                //Entire Information Array for a single event
                if (ifTitle.color == 65535) {
                  if (ifTitle.color == 65535) {
                    message.react("⏰");
                  }
                  informationArray.push({
                    eventID_: message.id,
                    usersID_: [],
                    eventName: tidyString,
                    eventDiscription: [],
                    incog: false,
                    authorName: reminderEmbed.footer,
                    usersMessaged: [],
                    reminderList: [],
                    timeStamp: message.createdTimestamp,
                    finalTimeStamp: finalTimeStamp,
                    finishTimeStamp: finalTimeStamp + message.createdTimestamp,
                    timeStampMin:
                      finalTimeStamp + message.createdTimestamp - 900000,
                    timeStampHour:
                      finalTimeStamp + message.createdTimestamp - 3600000,
                    timeStampThreeHour:
                      finalTimeStamp + message.createdTimestamp - 10800000,
                    timeStampSixHour:
                      finalTimeStamp + message.createdTimestamp - 21600000,
                    timeStampDay:
                      finalTimeStamp + message.createdTimestamp - 86400000,
                    embedDate_: [],
                    embedDate2_: `<t:${(
                      finalTimeStamp + message.createdTimestamp
                    )
                      .toString()
                      .slice(0, -3)}:F>`,
                    userListEventStart: [],
                    userListEventMin: [],
                    userListEventHour: [],
                    userListEventThreeHour: [],
                    userListEventSixHour: [],
                    userListEventDay: [],
                  });
                }
              }
              //Optional timeStamp (GMT Locked, but fancier)

              if (ifTitle.color == 65535 || ifTitle.color == 4473924) {
                const targetIndex = informationArray.find(
                  (i) => i.eventID_ === message.id
                );

                if (targetIndex) {
                  targetIndex.newDescription = newDescription;

                  embedDate = new Date(targetIndex.finishTimeStamp)
                    .toLocaleString()
                    .slice(0, -3);

                  embedHoursOld = Number(
                    embedDate.charAt(12) + embedDate.charAt(13)
                  );
                  embedHoursNew =
                    embedDate.charAt(14) +
                    embedDate.charAt(15) +
                    embedDate.charAt(16);
                  embedHours = ((embedHoursOld + 11) % 12) + 1;

                  if (
                    Number(embedDate.charAt(12) + embedDate.charAt(13)) >= 12
                  ) {
                    embedDate = embedDate.slice(0, -5);
                    AMPM = embedHours + embedHoursNew + " PM";
                  } else {
                    embedDate = embedDate.slice(0, -5);
                    AMPM = embedHours + embedHoursNew + " AM";
                  }

                  // targetIndex.embedDate2_.push(embedDate + AMPM);

                  // reminderEmbed.setTitle(`__${targetIndex.eventName}__`);

                  reminderEmbed.setDescription(
                    `${targetIndex.newDescription}\n\n⏰ React For The Event Reminder Menu \n⚔️ Event Start: ${targetIndex.embedDate2_}`
                  );
                  newDescription = "";

                  message.edit(reminderEmbed);
                }
              }
            });
          }
        }

        //RUNS FIRST
        if (
          // Current Users avaible to test BOT Functions - Can be changed into roles/permissions Globally here
          event.d.author.id === "175963561741385728" ||
          event.d.author.id === "149912113844977664"
        ) {
          let targetChannel = client.channels.cache.get(event.d.channel_id); // Gets the location of the users message
          let eventContent = event.d.content; //Pulls full message
          let prefixMessage = eventContent.substr(1); //Removes the first character
          let splitMessage = prefixMessage.split(" "); //array of strings
          let preprimaryCommand = splitMessage[0]; //Splits messages
          let primaryCommand = preprimaryCommand.toLowerCase(); //Lowercase Primary command
          let prefix = eventContent.charAt(0); //Gets first charcter from full message
          let authorFooter = `Created by ${event.d.author.username}`; //Adds footer of the authors username
          let timeStampValue = "";
          let cleanTimeStampValue = "";
          let finalMessage = splitMessage;

          //Function turns full String into a new String past the word "in"
          if (splitMessage.indexOf("in") > 0) {
            for (i = splitMessage.indexOf("in"); i < splitMessage.length; i++) {
              timeStampValue = timeStampValue + " " + splitMessage[i];
            }
          }
          //Regex function to clean <time> part of the string for bad characters
          cleanTimeStampValue = timeStampValue
            .replace(/[\|&;\$%@"<>\(\)\+,]/g, "")
            .substring(1)
            .split(" ");

          //Regex function to clean full string for bad characters
          cleanRemoveString = eventContent
            .replace(/[\|&;\$%@"<>\(\)\+,]/g, "")
            .substring(1)
            .split(" ");

          //Function to locate the <number> and <time> of the string
          if (primaryCommand.toLowerCase() === "create") {
            const inValueOne =
              cleanRemoveString[cleanRemoveString.indexOf("in") + 1];
            const inValueTwo =
              cleanRemoveString[cleanRemoveString.indexOf("in") + 2];
            const cleanRemoveStringLower = cleanRemoveString.map((name) =>
              name.toLowerCase()
            );

            //Checking in <number> is a number and is positive
            if (!isNaN(inValueOne) && inValueOne > 0) {
              //Error Message for invalid Time Syntax
              if (inValueOne === "") {
                prefix = "";
                targetChannel.send("Time Syntax Error");
              }
              //Setting finalTimeStamp to each the Unix Time - <number>*<time>
              switch (inValueTwo) {
                case "minutes":
                  finalTimeStamp = Number(inValueOne) * 60000;
                  break;
                case "minute":
                  finalTimeStamp = Number(inValueOne) * 60000;
                  break;
                case "hours":
                  finalTimeStamp = Number(inValueOne) * 3600000;
                  break;
                case "hour":
                  finalTimeStamp = Number(inValueOne) * 3600000;
                  break;
                case "days":
                  finalTimeStamp = Number(inValueOne) * 86400000;
                  break;
                case "day":
                  finalTimeStamp = Number(inValueOne) * 86400000;
                  break;
                default:
                  prefix = "";
                  targetChannel.send(
                    "Syntax Error: !create *<Event Name>* in *<number>* *<minutes/hours/days>*"
                  );
                  break;
              }

              if (
                cleanRemoveStringLower.indexOf("link:") >
                cleanRemoveStringLower.indexOf("in")
              ) {
                console.log(newURL);
                if (
                  cleanRemoveStringLower[
                    cleanRemoveStringLower.indexOf("link:") + 1
                  ] !== "description:" &&
                  cleanRemoveStringLower[
                    cleanRemoveStringLower.indexOf("link:") + 1
                  ] !== " "
                ) {
                  let newURL =
                    cleanRemoveStringLower[
                      cleanRemoveStringLower.indexOf("link:") + 1
                    ];
                  isValidUrl(newURL)
                    ? reminderEmbed.setURL(newURL)
                    : targetChannel.send("URL is Invalid") && (prefix = "");
                }
              } else {
                reminderEmbed.setURL();
              }

              if (
                cleanRemoveStringLower.indexOf("description:") >
                cleanRemoveStringLower.indexOf("in")
              ) {
                if (
                  cleanRemoveStringLower[
                    cleanRemoveStringLower.indexOf("description:") + 1
                  ] !== "link:" &&
                  cleanRemoveStringLower.indexOf("description:") + 1 > 0
                ) {
                  let description = cleanRemoveStringLower.slice(
                    cleanRemoveStringLower.indexOf("description:") + 1
                  );
                  if (description.indexOf("link:") > 0) {
                    newDescription = description
                      .slice(0, description.indexOf("link:"))
                      .join(" ");

                    let newDescription =
                      newDescription.charAt(0).toUpperCase() +
                      newDescription.slice(1);

                    //reminderEmbed.setFooter(newDescription);
                  } else {
                    newDescription = description.join(" ");
                    newDescription =
                      newDescription.charAt(0).toUpperCase() +
                      newDescription.slice(1);
                  }
                }
              } else {
                reminderEmbed.setDescription();
              }

              // reminderEmbed.setDescription(
              //   "⏰ React to set a reminder for this event \n⚔️ Event Start " +
              //     targetReaction.embedDate2_
              // );
            } else {
              prefix = "";
              targetChannel.send(
                "Syntax Error: !create *<Event Name>* in *<number>* *<minutes/hours/days>*"
              );
              return;
            }
          }

          for (j = 0; j < cleanTimeStampValue.length; j++) {
            finalMessage.pop();
          }

          if (prefix === "!") {
            switch (primaryCommand) {
              case "time":
                targetChannel.send(
                  `Current time: <t:${Math.round(
                    new Date().getTime() / 1000
                  )}:F>`
                );
                break;
              case "create":
                if (botOnline) {
                  const allTitles = informationArray.map(
                    (item) => item.eventName
                  );

                  theRemovedElement = splitMessage.shift();
                  cleanString = splitMessage
                    .join(" ")
                    .replace(/[\|&;\$%@"<>\(\)\+,]/g, "");
                  tidyString =
                    cleanString.charAt(0).toUpperCase() + cleanString.slice(1);

                  event.d.attachments.forEach((item) => {
                    imageLink = item;
                  });

                  if (event.d.attachments.length == 0) {
                    imageLink.url = " ";
                  }

                  if (splitMessage.length == 0) {
                    targetChannel.send(
                      "Error, please use the syntax: !create *<Event Name>* in *<number>* *<minutes/hours/days>*, !list, !remove *<Event ID>* or !destroy"
                    );
                    return;
                  } else {
                    if (
                      cleanString.replace(/[" "]/g, "") != "" &&
                      cleanString.length < 256
                    ) {
                      if (!allTitles.includes(tidyString)) {
                        reminderEmbed.setTitle(`🗓️ __${tidyString}__`);
                        reminderEmbed.setFooter(`${authorFooter} | ⏰`);
                        reminderEmbed.fields = [];
                        reminderEmbed.addFields({
                          name: "👥 Attendees (0)",
                          value: "\u200B",
                        });
                        reminderEmbed.setThumbnail(imageLink.url);
                        // reminderEmbed.setColor("#444444"); ///// EDITED OUT THIS IS NEW

                        targetChannel.send(reminderEmbed);
                      } else {
                        targetChannel.send("Error, this event already exists");
                        finishTimeStamp = "";
                      }
                      return;
                    } else {
                      targetChannel.send("Invalid Name");
                    }
                  }
                } else {
                  targetChannel.send(
                    "To create events, please use !startupbot"
                  );
                }
                break;
              case "list":
                // const allLists = informationArray.map((item) => item.draft);

                // allListsFilter = allLists.filter((i) => {
                //   return (i = true);
                // });

                if (
                  informationArray.length === 0
                  // ||informationArray.length === allListsFilter.length
                ) {
                  targetChannel.send("There are currently no events");
                } else {
                  for (let i = 0; i < informationArray.length; i++) {
                    listTemplate.setColor("#00FF00");
                    listTemplate.setTitle(informationArray[i].eventName);
                    listTemplate.setDescription(
                      `ID: ${informationArray[i].eventID_}\nEvent Date: ${informationArray[i].embedDate2_}\nNumber of attendees: ${informationArray[i].usersID_.length}`
                    );
                    targetChannel.send(listTemplate);
                  }
                }

                break;
              case "remove":
                cleanRemoveString.shift();
                let editCleanRemoveString = cleanRemoveString.join(" ");
                const removeElementName = informationArray.find(
                  (i) =>
                    i.eventName.toLowerCase() ==
                    editCleanRemoveString.toLowerCase()
                );

                const removeElementID = informationArray.find(
                  (i) => i.eventID_ == editCleanRemoveString
                );

                if (removeElementName) {
                  listTemplate.setTitle(removeElementName.eventName);
                  listTemplate.setDescription(
                    `Event has been removed by <@${event.d.author.id}>`
                  );

                  listTemplate.setColor("#FF0000");
                  targetChannel.send(listTemplate);

                  let concatContacts =
                    removeElementName.userListEventStart.concat(
                      removeElementName.userListEventMin.concat(
                        removeElementName.userListEventHour.concat(
                          removeElementName.userListEventThreeHour.concat(
                            removeElementName.userListEventSixHour.concat(
                              removeElementName.userListEventDay.concat(
                                removeElementName.usersMessaged
                              )
                            )
                          )
                        )
                      )
                    );

                  let uniqueContacts = [...new Set(concatContacts)];

                  listTemplate.setDescription(
                    `Event has been removed by an Admin`
                  );
                  listTemplate.setColor("#FF0000");
                  uniqueContacts.forEach((i) =>
                    client.users.cache.get(i).send(listTemplate)
                  );

                  const indexRemove =
                    informationArray.indexOf(removeElementName);

                  if (indexRemove > -1) {
                    informationArray.splice(indexRemove, 1);
                  }
                } else if (removeElementID) {
                  listTemplate.setTitle(removeElementID.eventName);
                  listTemplate.setDescription(
                    `Event has been removed by <@${event.d.author.id}>`
                  );
                  listTemplate.setColor("#FF0000");
                  targetChannel.send(listTemplate);

                  let concatContacts =
                    removeElementID.userListEventStart.concat(
                      removeElementID.userListEventMin.concat(
                        removeElementID.userListEventHour.concat(
                          removeElementID.userListEventThreeHour.concat(
                            removeElementID.userListEventSixHour.concat(
                              removeElementID.userListEventDay.concat(
                                removeElementID.usersMessaged
                              )
                            )
                          )
                        )
                      )
                    );

                  let uniqueContacts = [...new Set(concatContacts)];

                  listTemplate.setDescription(
                    `Event has been removed by an admin`
                  );
                  listTemplate.setColor("#FF0000");
                  uniqueContacts.forEach((i) =>
                    client.users.cache.get(i).send(listTemplate)
                  );

                  const indexRemove = informationArray.indexOf(removeElementID);
                  if (indexRemove > -1) {
                    informationArray.splice(indexRemove, 1);
                  }
                } else {
                  if (informationArray.length === 0) {
                    targetChannel.send("There are currently no events");
                  } else {
                    targetChannel.send("Unknown Event");
                  }
                }
                break;
              case "help":
                // if (event.d.channel_id == authChannel) {
                //   client.users.cache.get(event.d.author.id).send(helpEmbed);
                // } else {
                targetChannel.send(helpEmbed);
                //}
                break;
              case "startupbot":
                if (!botOnline) {
                  botOnline = true;
                  targetChannel.send("BOT is now Online.");
                  function testClock() {
                    //console.log(informationArray);
                    const arrayTimeStampSTART = informationArray.map(
                      (item) => item.finishTimeStamp
                    );

                    const arrayTimeStampMIN = informationArray.map(
                      (item) => item.timeStampMin
                    );

                    const arrayTimeStampHOUR = informationArray.map(
                      (item) => item.timeStampHour
                    );

                    const arrayTimeStampTHREEHOUR = informationArray.map(
                      (item) => item.timeStampThreeHour
                    );

                    const arrayTimeStampSIXHOUR = informationArray.map(
                      (item) => item.timeStampSixHour
                    );

                    const arrayTimeStampDAY = informationArray.map(
                      (item) => item.timeStampDay
                    );

                    const found = arrayTimeStampSTART.find(
                      (item) => item < new Date().getTime()
                    );

                    for (let i = 0; i < arrayTimeStampMIN.length; i++) {
                      if (new Date().getTime() - arrayTimeStampMIN[i] > 0) {
                        const timeReactionMin = informationArray[i];
                        if (timeReactionMin.userListEventMin.length > 0) {
                          eventStartMin.setDescription(
                            `Event Name: ${timeReactionMin.eventName}`
                          );

                          timeReactionMin.userListEventMin.forEach((element) =>
                            client.users.cache.get(element).send(eventStartMin)
                          );

                          timeReactionMin.userListEventMin = [];
                        }
                      }
                    }

                    for (let i = 0; i < arrayTimeStampHOUR.length; i++) {
                      if (new Date().getTime() - arrayTimeStampHOUR[i] > 0) {
                        const timeReactionHour = informationArray[i];
                        if (timeReactionHour.userListEventHour.length > 0) {
                          eventStartHour.setDescription(
                            `Event Name: ${timeReactionHour.eventName}`
                          );

                          timeReactionHour.userListEventHour.forEach(
                            (element) =>
                              client.users.cache
                                .get(element)
                                .send(eventStartHour)
                          );

                          timeReactionHour.userListEventHour = [];
                        }
                      }
                    }

                    for (let i = 0; i < arrayTimeStampTHREEHOUR.length; i++) {
                      if (
                        new Date().getTime() - arrayTimeStampTHREEHOUR[i] >
                        0
                      ) {
                        const timeReactionThreeHour = informationArray[i];
                        if (
                          timeReactionThreeHour.userListEventThreeHour.length >
                          0
                        ) {
                          eventStartThreeHour.setDescription(
                            `Event Name: ${timeReactionThreeHour.eventName}`
                          );

                          timeReactionThreeHour.userListEventThreeHour.forEach(
                            (element) =>
                              client.users.cache
                                .get(element)
                                .send(eventStartThreeHour)
                          );

                          timeReactionThreeHour.userListEventThreeHour = [];
                        }
                      }
                    }

                    for (let i = 0; i < arrayTimeStampSIXHOUR.length; i++) {
                      if (new Date().getTime() - arrayTimeStampSIXHOUR[i] > 0) {
                        const timeReactionSixHour = informationArray[i];
                        if (
                          timeReactionSixHour.userListEventSixHour.length > 0
                        ) {
                          eventStartSixHour.setDescription(
                            `Event Name: ${timeReactionSixHour.eventName}`
                          );

                          timeReactionSixHour.userListEventSixHour.forEach(
                            (element) =>
                              client.users.cache
                                .get(element)
                                .send(eventStartSixHour)
                          );

                          timeReactionSixHour.userListEventSixHour = [];
                        }
                      }
                    }

                    for (let i = 0; i < arrayTimeStampDAY.length; i++) {
                      if (new Date().getTime() - arrayTimeStampDAY[i] > 0) {
                        const timeReactionDay = informationArray[i];
                        if (timeReactionDay.userListEventDay.length > 0) {
                          eventStartDay.setDescription(
                            `Event Name: ${timeReactionDay.eventName}`
                          );

                          timeReactionDay.userListEventDay.forEach((element) =>
                            client.users.cache.get(element).send(eventStartDay)
                          );

                          timeReactionDay.userListEventDay = [];
                        }
                      }
                    }
                    /*
                    console.log(arrayTimeStampSTART);
                    console.log(arrayTimeStampMIN);
                    console.log(informationArray);
                    for (let i = 0; i < arrayTimeStampSTART.length; i++) {
                      console.log(new Date().getTime() - arrayTimeStampMIN[i]);
                    }
                    console.log("test"); //fix this first

                    if (foundHour) {
                      console.log("runsHour");
                      const timeReactionHour = informationArray.find(
                        (i) => i.timeStampHour < new Date().getTime()
                      );
                      if (timeReactionHour.userListEventHour.length > 0) {
                        eventStartHour.setDescription(
                          `Event Name: ${timeReactionHour.eventName}`
                        );
                        eventStartHour.setFooter(timeReactionHour.embedDate_);
                        timeReactionHour.userListEventHour.forEach((element) =>
                          client.users.cache.get(element).send(eventStartHour)
                        );
                        timeReactionHour.userListEventHour = [];
                      }
                    }
                    if (foundMin) {
                      console.log("runsMin");
                      const timeReactionMin = informationArray.find(
                        (i) => i.timeStampMin < new Date().getTime()
                      );
                      if (timeReactionMin.userListEventMin.length > 0) {
                        eventStartMin.setDescription(
                          `Event Name: ${timeReactionMin.eventName}`
                        );
                        eventStartMin.setFooter(timeReactionMin.embedDate_);
                        timeReactionMin.userListEventMin.forEach((element) =>
                          client.users.cache.get(element).send(eventStartMin)
                        );

                        timeReactionMin.userListEventMin = [];
                      }
                    } */

                    if (found) {
                      const timeReaction = informationArray.find(
                        (i) => i.finishTimeStamp < new Date().getTime()
                      );

                      eventStart.setDescription(
                        `Event Name: ${timeReaction.eventName}`
                      );

                      timeReaction.userListEventStart.forEach((element) =>
                        client.users.cache.get(element).send(eventStart)
                      );

                      const index = informationArray.indexOf(timeReaction);
                      if (index > -1) {
                        informationArray.splice(index, 1);
                      }
                    }
                  }
                  setInterval(testClock, 1000);
                } else {
                  targetChannel.send("BOT is already Online.");
                }
                break;
              default:
                targetChannel.send("Please use !help for all commands");
                return;
            }
          }
        }
      }
    });

    client.on("messageReactionAdd", async (messageReaction, user) => {
      if (messageReaction === undefined) {
        //Doesnt break program on unknown reactions
        return;
      }
      messageReaction.message.embeds.forEach((embed) => {
        ifTitle = embed;
      });

      if (messageReaction.message.author.id === "861972357140971571") {
        //Check to see if its the bots message

        const targetReaction = informationArray.find(
          (i) => i.eventID_ === messageReaction.message.id
        );

        const testReaction = informationArray.find(
          (i) => `🗓️ __${i.eventName}__` === ifTitle.title
        );

        messageReaction.message.embeds.forEach((embed) => {
          ifTitle = embed;
        });

        let emojiName = messageReaction.emoji.name.toLowerCase();

        if (user.id === "861972357140971571") {
        } else {
          if (ifTitle.color == 65535 || ifTitle.color == 40447) {
            if (informationArray.includes(testReaction)) {
              if (testReaction.finalTimeStamp > 86400000) {
                if (emojiName === "1️⃣") {
                  if (testReaction.userListEventStart.includes(user.id)) {
                  } else {
                    testReaction.userListEventStart.push(user.id);
                    ifTitle.fields[0].name = ifTitle.fields[0].name.replace(
                      "1️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "2️⃣") {
                  if (testReaction.userListEventMin.includes(user.id)) {
                  } else {
                    testReaction.userListEventMin.push(user.id);
                    ifTitle.fields[1].name = ifTitle.fields[1].name.replace(
                      "2️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "3️⃣") {
                  if (testReaction.userListEventHour.includes(user.id)) {
                  } else {
                    testReaction.userListEventHour.push(user.id);
                    ifTitle.fields[2].name = ifTitle.fields[2].name.replace(
                      "3️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "4️⃣") {
                  if (testReaction.userListEventThreeHour.includes(user.id)) {
                  } else {
                    testReaction.userListEventThreeHour.push(user.id);
                    ifTitle.fields[0].value = ifTitle.fields[0].value.replace(
                      "4️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "5️⃣") {
                  if (testReaction.userListEventSixHour.includes(user.id)) {
                  } else {
                    testReaction.userListEventSixHour.push(user.id);
                    ifTitle.fields[1].value = ifTitle.fields[1].value.replace(
                      "5️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "6️⃣") {
                  if (testReaction.userListEventDay.includes(user.id)) {
                  } else {
                    testReaction.userListEventDay.push(user.id);
                    ifTitle.fields[2].value = ifTitle.fields[2].value.replace(
                      "6️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
              } else if (testReaction.finalTimeStamp > 21600000) {
                if (emojiName === "1️⃣") {
                  if (testReaction.userListEventStart.includes(user.id)) {
                  } else {
                    testReaction.userListEventStart.push(user.id);
                    ifTitle.fields[0].name = ifTitle.fields[0].name.replace(
                      "1️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "2️⃣") {
                  if (testReaction.userListEventMin.includes(user.id)) {
                  } else {
                    testReaction.userListEventMin.push(user.id);
                    ifTitle.fields[1].name = ifTitle.fields[1].name.replace(
                      "2️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "3️⃣") {
                  if (testReaction.userListEventHour.includes(user.id)) {
                  } else {
                    testReaction.userListEventHour.push(user.id);
                    ifTitle.fields[2].name = ifTitle.fields[2].name.replace(
                      "3️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "4️⃣") {
                  if (testReaction.userListEventThreeHour.includes(user.id)) {
                  } else {
                    testReaction.userListEventThreeHour.push(user.id);
                    ifTitle.fields[0].value = ifTitle.fields[0].value.replace(
                      "4️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "5️⃣") {
                  if (testReaction.userListEventSixHour.includes(user.id)) {
                  } else {
                    testReaction.userListEventSixHour.push(user.id);
                    ifTitle.fields[1].value = ifTitle.fields[1].value.replace(
                      "5️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
              } else if (testReaction.finalTimeStamp > 10800000) {
                if (emojiName === "1️⃣") {
                  if (testReaction.userListEventStart.includes(user.id)) {
                  } else {
                    testReaction.userListEventStart.push(user.id);
                    ifTitle.fields[0].name = ifTitle.fields[0].name.replace(
                      "1️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "2️⃣") {
                  if (testReaction.userListEventMin.includes(user.id)) {
                  } else {
                    testReaction.userListEventMin.push(user.id);
                    ifTitle.fields[1].name = ifTitle.fields[1].name.replace(
                      "2️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "3️⃣") {
                  if (testReaction.userListEventHour.includes(user.id)) {
                  } else {
                    testReaction.userListEventHour.push(user.id);
                    ifTitle.fields[2].name = ifTitle.fields[2].name.replace(
                      "3️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "4️⃣") {
                  if (testReaction.userListEventThreeHour.includes(user.id)) {
                  } else {
                    testReaction.userListEventThreeHour.push(user.id);
                    ifTitle.fields[0].value = ifTitle.fields[0].value.replace(
                      "4️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
              } else if (testReaction.finalTimeStamp > 3600000) {
                if (emojiName === "1️⃣") {
                  if (testReaction.userListEventStart.includes(user.id)) {
                  } else {
                    testReaction.userListEventStart.push(user.id);
                    ifTitle.fields[0].name = ifTitle.fields[0].name.replace(
                      "1️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "2️⃣") {
                  if (testReaction.userListEventMin.includes(user.id)) {
                  } else {
                    testReaction.userListEventMin.push(user.id);
                    ifTitle.fields[1].name = ifTitle.fields[1].name.replace(
                      "2️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "3️⃣") {
                  if (testReaction.userListEventHour.includes(user.id)) {
                  } else {
                    testReaction.userListEventHour.push(user.id);
                    ifTitle.fields[2].name = ifTitle.fields[2].name.replace(
                      "3️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
              } else if (testReaction.finalTimeStamp > 900000) {
                if (emojiName === "1️⃣") {
                  if (testReaction.userListEventStart.includes(user.id)) {
                  } else {
                    testReaction.userListEventStart.push(user.id);
                    ifTitle.fields[0].name = ifTitle.fields[0].name.replace(
                      "1️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
                if (emojiName === "2️⃣") {
                  if (testReaction.userListEventMin.includes(user.id)) {
                  } else {
                    testReaction.userListEventMin.push(user.id);
                    ifTitle.fields[1].name = ifTitle.fields[1].name.replace(
                      "2️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
              } else {
                if (emojiName === "1️⃣") {
                  if (testReaction.userListEventStart.includes(user.id)) {
                  } else {
                    testReaction.userListEventStart.push(user.id);

                    ifTitle.fields[0].name = ifTitle.fields[0].name.replace(
                      "1️⃣",
                      "✅"
                    );
                    messageReaction.message.edit(ifTitle);
                  }
                }
              }
            } else {
              // messageReaction.message.embeds.forEach((embed) => {
              //   ifTitle = embed;
              // });

              //Commented out - but re add for solution if needed

              if (messageReaction.content) {
              } else {
                if (ifTitle.color == 40447 || ifTitle.color == 65535) {
                  client.users.cache.get(user.id).send(eventAlreadyStarted);
                }
              }
            }
          }
        }

        if (ifTitle.color == 65535 || ifTitle.color == 40447) {
          if (!targetReaction) {
            //Check to see if message has an eventID_ (To cover for all bot messages which aren't events)
            return;
          } else {
            if (user.id === "861972357140971571") {
              //Check to see if the bot has reacted to itself
              return;
            }

            //Checks needed here
            directEmbed.setTitle(`🗓️ __${targetReaction.eventName}__`);
            directEmbed.setFooter(`${targetReaction.authorName.text}`);
            directEmbed.setDescription(
              "⏰ **Please Select An Alert Time** \n⚔️ Event Start: " +
                targetReaction.embedDate2_
            );
            directEmbedV1.setTitle(`🗓️ __${targetReaction.eventName}__`);
            directEmbedV1.setFooter(`${targetReaction.authorName.text}`);
            directEmbedV1.setDescription(
              "⏰ **Please Select An Alert Time** \n⚔️ Event Start: " +
                targetReaction.embedDate2_
            );
            directEmbedV2.setTitle(`🗓️ __${targetReaction.eventName}__`);
            directEmbedV2.setFooter(`${targetReaction.authorName.text}`);
            directEmbedV2.setDescription(
              "⏰ **Please Select An Alert Time** \n⚔️ Event Start: " +
                targetReaction.embedDate2_
            );
            directEmbedV3.setTitle(`🗓️ __${targetReaction.eventName}__`);
            directEmbedV3.setFooter(`${targetReaction.authorName.text}`);
            directEmbedV3.setDescription(
              "⏰ **Please Select An Alert Time** \n⚔️ Event Start: " +
                targetReaction.embedDate2_
            );
            directEmbedV4.setTitle(`🗓️ __${targetReaction.eventName}__`);
            directEmbedV4.setFooter(`${targetReaction.authorName.text}`);
            directEmbedV4.setDescription(
              "⏰ **Please Select An Alert Time** \n⚔️ Event Start: " +
                targetReaction.embedDate2_
            );
            directEmbedV5.setTitle(`🗓️ __${targetReaction.eventName}__`);
            directEmbedV5.setFooter(`${targetReaction.authorName.text}`);
            directEmbedV5.setDescription(
              "⏰ **Please Select An Alert Time** \n⚔️ Event Start: " +
                targetReaction.embedDate2_
            );

            if (targetReaction.usersID_.includes(`<@${user.id}>`)) {
              //Check for userID duplicates on certain events
              return;
            } else {
              //Else add userID to the specific eventID object
              targetReaction.usersID_.push(`<@${user.id}>`);
            }

            if (targetReaction.usersMessaged.includes(user.id)) {
              client.users.cache.get(user.id).send(messageEmbed);
            } else {
              targetReaction.usersMessaged.push(user.id);

              if (testReaction.finalTimeStamp > 86400000) {
                client.users.cache.get(user.id).send(directEmbedV5);
              } else if (testReaction.finalTimeStamp > 21600000) {
                client.users.cache.get(user.id).send(directEmbedV4);
              } else if (testReaction.finalTimeStamp > 10800000) {
                client.users.cache.get(user.id).send(directEmbedV3);
              } else if (testReaction.finalTimeStamp > 3600000) {
                client.users.cache.get(user.id).send(directEmbed);
              } else if (testReaction.finalTimeStamp > 900000) {
                client.users.cache.get(user.id).send(directEmbedV1);
              } else {
                client.users.cache.get(user.id).send(directEmbedV2);
              }
            }

            reminderEmbed.fields = [];
            reminderEmbed.addFields({
              name: `👥 Attendees (${targetReaction.usersID_.length})`,
              value: `> ${targetReaction.usersID_}`,
            });
            reminderEmbed.setDescription(
              `${targetReaction.newDescription}\n\n⏰ React For The Event Reminder Menu \n⚔️ Event Start: ${targetReaction.embedDate2_}`
            );
            reminderEmbed.setTitle(`🗓️ __${targetReaction.eventName}__`);
            messageReaction.message.edit(reminderEmbed);
          }
        }
      }
    });

    client.on("messageReactionRemove", async (messageReaction, user) => {
      if (messageReaction === undefined) {
        //Doesnt break program on unknown reactions
        return;
      }

      messageReaction.message.embeds.forEach((embed) => {
        ifTitle = embed;
      });

      let emojiName = messageReaction.emoji.name.toLowerCase();

      const testReaction = informationArray.find(
        (i) => `🗓️ __${i.eventName}__` === ifTitle.title
      );

      if (messageReaction.message.author.id === "861972357140971571") {
        //Check to see if its the bots message

        const targetReaction = informationArray.find(
          (i) => i.eventID_ === messageReaction.message.id
        );
        if (ifTitle.color == 65535 || ifTitle.color == 40447) {
          if (informationArray.includes(testReaction)) {
            if (finalTimeStamp > 86400000) {
              //                          console.log("all 6");
              if (emojiName === "1️⃣") {
                const indexUserID = testReaction.userListEventStart.indexOf(
                  user.id
                );
                if (indexUserID > -1) {
                  testReaction.userListEventStart.splice(indexUserID, 1);
                }
                ifTitle.fields[0].name = ifTitle.fields[0].name.replace(
                  "✅",
                  "1️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "2️⃣") {
                const indexUserID2 = testReaction.userListEventMin.indexOf(
                  user.id
                );
                if (indexUserID2 > -1) {
                  testReaction.userListEventMin.splice(indexUserID2, 1);
                }
                ifTitle.fields[1].name = ifTitle.fields[1].name.replace(
                  "✅",
                  "2️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "3️⃣") {
                const indexUserID3 = testReaction.userListEventHour.indexOf(
                  user.id
                );
                if (indexUserID3 > -1) {
                  testReaction.userListEventHour.splice(indexUserID3, 1);
                }
                ifTitle.fields[2].name = ifTitle.fields[2].name.replace(
                  "✅",
                  "3️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "4️⃣") {
                const indexUserID4 =
                  testReaction.userListEventThreeHour.indexOf(user.id);
                if (indexUserID4 > -1) {
                  testReaction.userListEventThreeHour.splice(indexUserID4, 1);
                }
                ifTitle.fields[0].value = ifTitle.fields[0].value.replace(
                  "✅",
                  "4️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "5️⃣") {
                const indexUserID5 = testReaction.userListEventSixHour.indexOf(
                  user.id
                );
                if (indexUserID5 > -1) {
                  testReaction.userListEventSixHour.splice(indexUserID5, 1);
                }
                ifTitle.fields[1].value = ifTitle.fields[1].value.replace(
                  "✅",
                  "5️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "6️⃣") {
                const indexUserID6 = testReaction.userListEventDay.indexOf(
                  user.id
                );
                if (indexUserID6 > -1) {
                  testReaction.userListEventDay.splice(indexUserID6, 1);
                }
                ifTitle.fields[2].value = ifTitle.fields[2].value.replace(
                  "✅",
                  "6️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
            } else if (finalTimeStamp > 21600000) {
              if (emojiName === "1️⃣") {
                const indexUserID = testReaction.userListEventStart.indexOf(
                  user.id
                );
                if (indexUserID > -1) {
                  testReaction.userListEventStart.splice(indexUserID, 1);
                }
                ifTitle.fields[0].name = ifTitle.fields[0].name.replace(
                  "✅",
                  "1️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "2️⃣") {
                const indexUserID2 = testReaction.userListEventMin.indexOf(
                  user.id
                );
                if (indexUserID2 > -1) {
                  testReaction.userListEventMin.splice(indexUserID2, 1);
                }
                ifTitle.fields[1].name = ifTitle.fields[1].name.replace(
                  "✅",
                  "2️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "3️⃣") {
                const indexUserID3 = testReaction.userListEventHour.indexOf(
                  user.id
                );
                if (indexUserID3 > -1) {
                  testReaction.userListEventHour.splice(indexUserID3, 1);
                }
                ifTitle.fields[2].name = ifTitle.fields[2].name.replace(
                  "✅",
                  "3️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "4️⃣") {
                const indexUserID4 =
                  testReaction.userListEventThreeHour.indexOf(user.id);
                if (indexUserID4 > -1) {
                  testReaction.userListEventThreeHour.splice(indexUserID4, 1);
                }
                ifTitle.fields[0].value = ifTitle.fields[0].value.replace(
                  "✅",
                  "4️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "5️⃣") {
                const indexUserID5 = testReaction.userListEventSixHour.indexOf(
                  user.id
                );
                if (indexUserID5 > -1) {
                  testReaction.userListEventSixHour.splice(indexUserID5, 1);
                }
                ifTitle.fields[1].value = ifTitle.fields[1].value.replace(
                  "✅",
                  "5️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
            } else if (finalTimeStamp > 10800000) {
              if (emojiName === "1️⃣") {
                const indexUserID = testReaction.userListEventStart.indexOf(
                  user.id
                );
                if (indexUserID > -1) {
                  testReaction.userListEventStart.splice(indexUserID, 1);
                }
                ifTitle.fields[0].name = ifTitle.fields[0].name.replace(
                  "✅",
                  "1️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "2️⃣") {
                const indexUserID2 = testReaction.userListEventMin.indexOf(
                  user.id
                );
                if (indexUserID2 > -1) {
                  testReaction.userListEventMin.splice(indexUserID2, 1);
                }
                ifTitle.fields[1].name = ifTitle.fields[1].name.replace(
                  "✅",
                  "2️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "3️⃣") {
                const indexUserID3 = testReaction.userListEventHour.indexOf(
                  user.id
                );
                if (indexUserID3 > -1) {
                  testReaction.userListEventHour.splice(indexUserID3, 1);
                }
                ifTitle.fields[2].name = ifTitle.fields[2].name.replace(
                  "✅",
                  "3️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "4️⃣") {
                const indexUserID4 =
                  testReaction.userListEventThreeHour.indexOf(user.id);
                if (indexUserID4 > -1) {
                  testReaction.userListEventThreeHour.splice(indexUserID4, 1);
                }
                ifTitle.fields[0].value = ifTitle.fields[0].value.replace(
                  "✅",
                  "4️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
            } else if (finalTimeStamp > 3600000) {
              if (emojiName === "1️⃣") {
                const indexUserID = testReaction.userListEventStart.indexOf(
                  user.id
                );
                if (indexUserID > -1) {
                  testReaction.userListEventStart.splice(indexUserID, 1);
                }
                ifTitle.fields[0].name = ifTitle.fields[0].name.replace(
                  "✅",
                  "1️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "2️⃣") {
                const indexUserID2 = testReaction.userListEventMin.indexOf(
                  user.id
                );
                if (indexUserID2 > -1) {
                  testReaction.userListEventMin.splice(indexUserID2, 1);
                }
                ifTitle.fields[1].name = ifTitle.fields[1].name.replace(
                  "✅",
                  "2️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "3️⃣") {
                const indexUserID3 = testReaction.userListEventHour.indexOf(
                  user.id
                );
                if (indexUserID3 > -1) {
                  testReaction.userListEventHour.splice(indexUserID3, 1);
                }
                ifTitle.fields[2].name = ifTitle.fields[2].name.replace(
                  "✅",
                  "3️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
            } else if (finalTimeStamp > 900000) {
              if (emojiName === "1️⃣") {
                const indexUserID = testReaction.userListEventStart.indexOf(
                  user.id
                );
                if (indexUserID > -1) {
                  testReaction.userListEventStart.splice(indexUserID, 1);
                }
                ifTitle.fields[0].name = ifTitle.fields[0].name.replace(
                  "✅",
                  "1️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
              if (emojiName === "2️⃣") {
                const indexUserID2 = testReaction.userListEventMin.indexOf(
                  user.id
                );
                if (indexUserID2 > -1) {
                  testReaction.userListEventMin.splice(indexUserID2, 1);
                }
                ifTitle.fields[1].name = ifTitle.fields[1].name.replace(
                  "✅",
                  "2️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
            } else {
              if (emojiName === "1️⃣") {
                const indexUserID = testReaction.userListEventStart.indexOf(
                  user.id
                );
                if (indexUserID > -1) {
                  testReaction.userListEventStart.splice(indexUserID, 1);
                }
                ifTitle.fields[0].name = ifTitle.fields[0].name.replace(
                  "✅",
                  "1️⃣"
                );
                messageReaction.message.edit(ifTitle);
              }
            }
          }
        }

        if (ifTitle.color == 65535 || ifTitle.color == 40447) {
          if (!messageReaction.content) {
            if (!testReaction) {
              //Check to see if message has an eventID_ (To cover for all bot messages which aren't events)

              return;
            } else {
              if (ifTitle.color == 65535) {
                if (testReaction.usersID_.includes(`<@${user.id}>`)) {
                  testReaction.usersID_ = testReaction.usersID_.filter((i) => {
                    return i !== `<@${user.id}>`;
                  });
                }

                if (testReaction.usersID_.length == 0) {
                  reminderEmbed.fields = [];
                  reminderEmbed.addFields({
                    name: "👥 Attendees (0)",
                    value: "\u200B",
                  });
                  reminderEmbed.setTitle(`🗓️ __${testReaction.eventName}__`);

                  messageReaction.message.edit(reminderEmbed);
                } else {
                  reminderEmbed.fields = [];
                  reminderEmbed.addFields({
                    name: `👥 Attendees (${testReaction.usersID_.length})`,
                    value: `> ${testReaction.usersID_}`,
                  });
                  reminderEmbed.setTitle(`🗓️ __${testReaction.eventName}__`);

                  messageReaction.message.edit(reminderEmbed);
                }
              }
            }
          }
        }
      }
    });

    client.on("message", (message) => {
      if (message.author.id === "861972357140971571") {
        if (message.channel.type == "dm") {
          message.embeds.forEach((embed) => {
            ifTitle = embed;
          });

          if (!message.content) {
            if (ifTitle.color == 40447) {
              if (ifTitle.fields.length >= 1) {
                message.react("1️⃣");
              }
              if (ifTitle.fields.length >= 2) {
                message.react("2️⃣");
              }
              if (ifTitle.fields.length >= 3) {
                message.react("3️⃣");
                if (ifTitle.fields[0].value.length > 1) {
                  message.react("4️⃣");
                }
                if (ifTitle.fields[1].value.length > 1) {
                  message.react("5️⃣");
                }
                if (ifTitle.fields[2].value.length > 1) {
                  message.react("6️⃣");
                }
              }
            }
          }
        }
      }
    });

    /*
    function testClock() {
      const arrayTimeStampSTART = informationArray.map(
        (item) => item.finishTimeStamp
      );

      console.log(arrayTimeStampSTART);
      console.log(new Date().getTime());

      let found = arrayTimeStampSTART.find(
        (item) => item < new Date().getTime()
      );
      console.log(arrayTimeStampSTART.indexOf(found));

      if (found) {
        const timeReaction = informationArray.find(
          (i) => i.finishTimeStamp < new Date().getTime()
        );
        eventStart.setDescription(`Event Name: ${timeReaction.eventName}`);
        eventStart.setFooter(timeReaction.embedDate_);
        timeReaction.userListEventStart.forEach((element) =>
          client.users.cache.get(element).send(eventStart)
        );

        console.log(timeReaction);
        const index = informationArray.indexOf(timeReaction);
        if (index > -1) {
          informationArray.splice(index, 1);
        }
      }
    }

    setInterval(testClock, 1000); */
  } catch (error) {
    console.log(error);
  }
});
