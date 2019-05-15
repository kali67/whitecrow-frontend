import {
    FETCH_USER_PLAYER,
    UPDATE_PLAYER_MAIL_CARDS,
    UPDATE_PLAYER_OPPOURTUNITY_CARDS,
    UPDATE_PLAYER_DAY,
    UPDATE_PLAYER_MONEY,
    UPDATE_PLAYER_GAME_STATUS
} from "./types";

import axios from "axios";

export const fetchUserPlayer = gameId => dispatch => {
    axios
        .get(`/game/${gameId}/player`, {
            auth: {
                username: "hta55",
                password: "welcome1"
            }
        })
        .then(response => {
            dispatch({
                type: FETCH_USER_PLAYER,
                player: {
                    id: response.data["id"],
                    mail: response.data["mailCards"],
                    opportunity: response.data["opportunityCards"],
                    day: response.data["day"],
                    money: response.data["money"],
                    username: response.data["username"],
                    hasFinishedGame: response.data["hasFinishedGame"]
                }
            });
        });
};

export const updatePlayerCards = card => dispatch => {
    if (card["cardType"] === "MAIL") {
        dispatch({
            type: UPDATE_PLAYER_MAIL_CARDS,
            card: card
        });
    } else {
        dispatch({
            type: UPDATE_PLAYER_OPPOURTUNITY_CARDS,
            card: card
        });
    }
};

export const updatePlayerMoney = money => dispatch => {
    dispatch({
        type: UPDATE_PLAYER_MONEY,
        money: money
    });
};

export const updatePlayerDay = day => dispatch => {
    dispatch({
        type: UPDATE_PLAYER_DAY,
        day: day
    });
};

export const playerHasFinishedGame = () => dispatch => {
    dispatch({
        type: UPDATE_PLAYER_GAME_STATUS,
        hasFinishedGame: true
    });
};
