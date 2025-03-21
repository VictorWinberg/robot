module Utils.Position exposing (..)

import Utils.Room exposing (Room, RoomShape(..))


type alias Position =
    { x : Int
    , y : Int
    , direction : Direction
    }


type Direction
    = N
    | E
    | S
    | W


turnLeft : Position -> Position
turnLeft state =
    case state.direction of
        N ->
            { state | direction = W }

        W ->
            { state | direction = S }

        S ->
            { state | direction = E }

        E ->
            { state | direction = N }


turnRight : Position -> Position
turnRight state =
    case state.direction of
        N ->
            { state | direction = E }

        E ->
            { state | direction = S }

        S ->
            { state | direction = W }

        W ->
            { state | direction = N }


moveForward : Position -> Position
moveForward state =
    case state.direction of
        N ->
            { state | y = state.y - 1 }

        E ->
            { state | x = state.x + 1 }

        S ->
            { state | y = state.y + 1 }

        W ->
            { state | x = state.x - 1 }


isValidPosition : Room -> Position -> Bool
isValidPosition room state =
    case room.shape of
        Square ->
            state.x >= 0 && state.x < room.size && state.y >= 0 && state.y < room.size

        Circle ->
            let
                distanceFromCenter =
                    sqrt (toFloat (state.x * state.x + state.y * state.y))
            in
            distanceFromCenter <= toFloat room.size


toString : Position -> String
toString { x, y, direction } =
    String.join " " [ String.fromInt x, String.fromInt y, directionToString direction ]


directionToString : Direction -> String
directionToString dir =
    case dir of
        N ->
            "N"

        E ->
            "E"

        S ->
            "S"

        W ->
            "W"
