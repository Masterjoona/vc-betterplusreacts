/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

export default definePlugin({
    name: "BetterPlusReacts",
    authors: [{
        name: "Joona",
        id: 297410829589020673n
    }],
    description: "The amount of plus before :emoji: is the message to add it to",
    patches: [
        {
            find: "searchReplace",
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
                    replace: "=$1.getByIndex($1.length - $2.split('+').length + 1)"
                }
            ]
        },
        {
            find: "this.props.activeCommandOption,",
            replacement:[
                // Activate auto complete for multiple plusses
                // and carry the amount of plusses to the below patch
                {
                    match: /:this.props.currentWord/,
                    replace: "$&.replace(/^\\++/, '+')"
                },
                {
                    match: /\.queryText}\);/,
                    replace: ".queryText,VcPlusReactions:this.props.currentWord.split(':')[0]+':'});"
                }
            ]
        },
        {
            find: ".Messages.REACTIONS_MATCHING,",
            replacement:[
                {
                    match: /,options:\i/,
                    replace: "$&,VcPlusReactions:VcPlusReactions"
                },
                {
                    match: /\i\.\i\)\.concat(?<=return.{18,24})/,
                    replace: "VcPlusReactions).concat"
                }
            ]
        }
    ]
});
