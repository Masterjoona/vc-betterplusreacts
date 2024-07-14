/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { findByPropsLazy } from "@webpack";

const { getMessages } = findByPropsLazy("getMessages");

export default definePlugin({
    name: "BetterPlusReacts",
    authors: [{
        name: "Joona",
        id: 297410829589020673n
    }],
    description: "The amount of plus before :emoji: is the message to add it to",
    patches: [
        {
            find: ".SLASH_COMMAND_USED,",
            replacement: [
                {
                    match: /\\\+/,
                    replace: "$&*"
                },
                {
                    match: /\i.trim\(\)/,
                    replace: "$&.replace(/^\\++/, '+')"
                },
                {
                    match: /=(\i\.\i\.getMessages\(\i\.id\))\.last\(\)(?=.{78,85}.getByName\((\i)\.)/,
                    replace: "=$self.getMsgReference()"
                }
            ]
        },
        {
            find: "this.props.activeCommandOption,",
            replacement:[
                // Enable auto complete for multiple plusses
                // and set the message reference
                {
                    match: /:this.props.currentWord/,
                    replace: "$&.replace(/^\\++/, '+')"
                },
                {
                    match: /this.props.editorRef.current\)return;/,
                    replace: "$&$self.setMsgReference(this.props.currentWord.split(':')[0],this.props.channel.id);"
                }
            ]
        },
    ],
    message: null,
    getMsgReference() {
        const { message } = this;
        this.message = null;
        return message;
    },
    setMsgReference(plusses: string, channelId: string) {
        this.message = getMessages(channelId).getByIndex(getMessages(channelId).length - plusses.split("+").length + 1);
    }
});
