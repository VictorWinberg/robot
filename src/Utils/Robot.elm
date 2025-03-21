module Utils.Robot exposing (..)

import Utils.Language exposing (Language(..))
import Utils.Position exposing (Position, isValidPosition, moveForward, turnLeft, turnRight)
import Utils.Room exposing (Room)


commandMap : Language -> ( String, String, String )
commandMap lang =
    case lang of
        English ->
            ( "L", "R", "F" )

        Swedish ->
            ( "V", "H", "G" )

        French ->
            ( "G", "D", "A" )


executeCommand : Room -> Language -> String -> Position -> Position
executeCommand room lang command state =
    let
        ( left, right, forward ) =
            commandMap lang
    in
    if command == left then
        turnLeft state

    else if command == right then
        turnRight state

    else if command == forward then
        let
            newState =
                moveForward state
        in
        if isValidPosition room newState then
            newState

        else
            state

    else
        state


executeCommands : Room -> Language -> String -> Position -> Position
executeCommands room lang commands state =
    List.foldl (executeCommand room lang) state (String.split "" commands)
