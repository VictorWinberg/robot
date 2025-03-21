module Utils.String exposing (..)

import Dict exposing (Dict)


combineDuplicates : List String -> List String
combineDuplicates strings =
    let
        -- Count occurrences using a Dict
        countOccurrences : List String -> Dict String Int
        countOccurrences lst =
            List.foldl (\item dict -> Dict.update item (Maybe.withDefault 0 >> (+) 1 >> Just) dict) Dict.empty lst

        -- Convert counts to formatted messages
        formatMessages : Dict String Int -> List String
        formatMessages dict =
            Dict.toList dict
                |> List.map
                    (\( msg, count ) ->
                        if count > 1 then
                            msg ++ " (x" ++ String.fromInt count ++ ")"

                        else
                            msg
                    )
    in
    strings
        |> countOccurrences
        |> formatMessages
