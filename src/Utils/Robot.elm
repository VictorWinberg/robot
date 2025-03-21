module Utils.Robot exposing (..)

import Utils.Language exposing (Language(..))
import Utils.Position exposing (Position, isValidPosition, moveForward, turnLeft, turnRight)
import Utils.Room exposing (Room)
import Utils.String exposing (combineDuplicates)


commandMap : Language -> ( String, String, String )
commandMap lang =
    case lang of
        English ->
            ( "L", "R", "F" )

        Swedish ->
            ( "V", "H", "G" )

        French ->
            ( "G", "D", "A" )


type alias ExecutionResult =
    { endPos : Position
    , path : List Position
    , warnings : List String
    }


executeCommand : Room -> Language -> String -> ExecutionResult -> ExecutionResult
executeCommand room lang command ({ endPos, path, warnings } as result) =
    let
        ( left, right, forward ) =
            commandMap lang
    in
    if command == left then
        { result | endPos = turnLeft endPos }

    else if command == right then
        { result | endPos = turnRight endPos }

    else if command == forward then
        moveForward endPos
            |> (\newEndPos ->
                    if isValidPosition room newEndPos then
                        { result | endPos = newEndPos, path = path ++ [ newEndPos ] }

                    else
                        { result | warnings = warnings ++ [ "Robot hit the wall" ] }
               )

    else
        result


executeCommands : Room -> Language -> String -> Position -> ExecutionResult
executeCommands room lang commands startPos =
    List.foldl (executeCommand room lang) { endPos = startPos, path = [ startPos ], warnings = [] } (String.split "" commands)
        |> (\result -> { result | warnings = combineDuplicates result.warnings })
