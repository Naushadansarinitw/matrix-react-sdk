/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { MatrixEvent } from "matrix-js-sdk/src/matrix";
import { M_POLL_START, PollAnswer, M_POLL_KIND_DISCLOSED } from "matrix-js-sdk/src/@types/polls";
import { M_TEXT } from "matrix-js-sdk/src/@types/extensible_events";

export const makePollStartEvent = (
    question: string,
    sender: string,
    answers?: PollAnswer[],
    ts?: number,
    id?: string,
): MatrixEvent => {
    if (!answers) {
        answers = [
            { id: "socks", [M_TEXT.name]: "Socks" },
            { id: "shoes", [M_TEXT.name]: "Shoes" },
        ];
    }

    return new MatrixEvent({
        event_id: id || "$mypoll",
        room_id: "#myroom:example.com",
        sender: sender,
        type: M_POLL_START.name,
        content: {
            [M_POLL_START.name]: {
                question: {
                    [M_TEXT.name]: question,
                },
                kind: M_POLL_KIND_DISCLOSED.name,
                answers: answers,
            },
            [M_TEXT.name]: `${question}: answers`,
        },
        origin_server_ts: ts || 0,
    });
};
