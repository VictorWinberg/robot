module Utils.Language exposing (..)


type Language
    = English
    | Swedish
    | French


parseLanguage : String -> Maybe Language
parseLanguage lang =
    case lang of
        "english" ->
            Just English

        "swedish" ->
            Just Swedish

        "french" ->
            Just French

        _ ->
            Nothing
