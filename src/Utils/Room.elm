module Utils.Room exposing (..)


type alias Room =
    { shape : RoomShape
    , size : Int
    }


type RoomShape
    = Square
    | Circle


parseRoomShape : String -> Maybe RoomShape
parseRoomShape shape =
    case shape of
        "square" ->
            Just Square

        "circle" ->
            Just Circle

        _ ->
            Nothing
