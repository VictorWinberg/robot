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


turnLeft : Direction -> Direction
turnLeft dir =
    case dir of
        N ->
            W

        W ->
            S

        S ->
            E

        E ->
            N


turnRight : Direction -> Direction
turnRight dir =
    case dir of
        N ->
            E

        E ->
            S

        S ->
            W

        W ->
            N


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


isValidPosition : Position -> Room -> Bool
isValidPosition state room =
    case room.shape of
        Square ->
            state.x >= 0 && state.x < room.size && state.y >= 0 && state.y < room.size

        Circle ->
            let
                distanceFromCenter =
                    sqrt (toFloat (state.x * state.x + state.y * state.y))
            in
            distanceFromCenter <= toFloat room.size
