module Main exposing (..)

import Browser
import Html exposing (Html, div, form, h1, h2, input, label, option, p, select, span, text)
import Html.Attributes exposing (class, placeholder, type_, value)
import Html.Events exposing (onInput)


main : Program () Model Msg
main =
    Browser.sandbox { init = init, update = update, view = view }


type alias Model =
    { room : Room
    , startPos : Position
    , language : String
    , commands : String
    }


type alias Room =
    { shape : String
    , size : Int
    }


type alias Position =
    { x : Int
    , y : Int
    , direction : String
    }


init : Model
init =
    { room = Room "square" 5
    , startPos = Position 0 0 "N"
    , language = "english"
    , commands = ""
    }


type Msg
    = SetRoomShape String
    | SetRoomSize String
    | SetStartPositionX String
    | SetStartPositionY String
    | SetLanguage String
    | SetCommands String


update : Msg -> Model -> Model
update msg ({ room, startPos } as model) =
    case msg of
        SetRoomShape shape ->
            { model | room = { room | shape = shape } }

        SetRoomSize size ->
            { model | room = { room | size = Maybe.withDefault room.size (String.toInt size) } }

        SetStartPositionX x ->
            { model | startPos = { startPos | x = Maybe.withDefault startPos.x (String.toInt x) } }

        SetStartPositionY y ->
            { model | startPos = { startPos | y = Maybe.withDefault startPos.y (String.toInt y) } }

        SetLanguage lang ->
            { model | language = lang }

        SetCommands cmds ->
            { model | commands = cmds }


view : Model -> Html Msg
view model =
    div [ class "min-h-screen bg-gray-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8" ]
        [ div [ class "max-w-4xl mx-auto space-y-6" ]
            [ div [ class "text-center mb-8" ]
                [ h1 [ class "text-3xl font-semibold text-primary" ]
                    [ text "Robot", span [ class "text-secondary" ] [ text "Me" ], text "To" ]
                , p [ class "mt-2 text-sm text-gray-600" ] [ text "Control your robot with simple commands" ]
                ]
            , form [ class "space-y-6" ]
                [ div [ class "bg-white p-6 rounded-lg shadow-md" ]
                    [ h2 [ class "text-lg font-medium text-gray-900 mb-4" ] [ text "Room Configuration" ]
                    , div [ class "space-y-4" ]
                        [ div []
                            [ label [ class "block text-sm font-medium text-gray-700 mb-1" ] [ text "Room Shape" ]
                            , select [ class "input", onInput SetRoomShape ]
                                [ option [ value "square" ] [ text "Square" ]
                                , option [ value "circular" ] [ text "Circular" ]
                                ]
                            ]
                        , div []
                            [ label [ class "block text-sm font-medium text-gray-700 mb-1" ]
                                [ text
                                    (if model.room.shape == "square" then
                                        "Room Size"

                                     else
                                        "Room Radius"
                                    )
                                ]
                            , input [ class "input", type_ "number", value (String.fromInt model.room.size), onInput SetRoomSize ] []
                            ]
                        , div [ class "grid grid-cols-2 gap-4" ]
                            [ div []
                                [ label [ class "block text-sm font-medium text-gray-700 mb-1" ] [ text "Start X" ]
                                , input [ class "input", type_ "number", value (String.fromInt model.startPos.x), onInput SetStartPositionX ] []
                                ]
                            , div []
                                [ label [ class "block text-sm font-medium text-gray-700 mb-1" ] [ text "Start Y" ]
                                , input [ class "input", type_ "number", value (String.fromInt model.startPos.y), onInput SetStartPositionY ] []
                                ]
                            ]
                        ]
                    ]
                , div [ class "bg-white p-6 rounded-lg shadow-md" ]
                    [ h2 [ class "text-lg font-medium text-gray-900 mb-4" ] [ text "Command Configuration" ]
                    , div [ class "space-y-4" ]
                        [ div []
                            [ label [ class "block text-sm font-medium text-gray-700 mb-1" ] [ text "Language" ]
                            , select [ class "input", onInput SetLanguage ]
                                [ option [ value "english" ] [ text "English (L, R, F)" ]
                                , option [ value "swedish" ] [ text "Swedish (V, H, G)" ]
                                , option [ value "french" ] [ text "French (G, D, A)" ]
                                ]
                            ]
                        , div []
                            [ label [ class "block text-sm font-medium text-gray-700 mb-1" ] [ text "Commands" ]
                            , input [ class "input", type_ "text", placeholder "Enter commands...", value model.commands, onInput SetCommands ] []
                            ]
                        ]
                    ]
                ]
            ]
        ]
