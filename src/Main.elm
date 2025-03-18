module Main exposing (..)

import Browser
import Html exposing (Html, div, form, h1, h2, input, label, option, p, select, span, text)
import Html.Attributes exposing (class, placeholder, type_, value)


main : Program () Model msg
main =
    Browser.sandbox { init = init, update = update, view = view }


type alias Model =
    { roomShape : String
    , roomSize : Int
    , startX : Int
    , startY : Int
    , language : String
    , commands : String
    }


init : Model
init =
    { roomShape = "square"
    , roomSize = 5
    , startX = 0
    , startY = 0
    , language = "english"
    , commands = ""
    }


update : msg -> Model -> Model
update _ model =
    model


view : Model -> Html msg
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
                            , select [ class "input" ]
                                [ option [ value "square" ] [ text "Square" ]
                                , option [ value "circular" ] [ text "Circular" ]
                                ]
                            ]
                        , div []
                            [ label [ class "block text-sm font-medium text-gray-700 mb-1" ] [ text "Room Size" ]
                            , input [ class "input", type_ "number", value "5" ] []
                            ]
                        , div [ class "grid grid-cols-2 gap-4" ]
                            [ div []
                                [ label [ class "block text-sm font-medium text-gray-700 mb-1" ] [ text "Start X" ]
                                , input [ class "input", type_ "number", value "0" ] []
                                ]
                            , div []
                                [ label [ class "block text-sm font-medium text-gray-700 mb-1" ] [ text "Start Y" ]
                                , input [ class "input", type_ "number", value "0" ] []
                                ]
                            ]
                        ]
                    ]
                , div [ class "bg-white p-6 rounded-lg shadow-md" ]
                    [ h2 [ class "text-lg font-medium text-gray-900 mb-4" ] [ text "Command Configuration" ]
                    , div [ class "space-y-4" ]
                        [ div []
                            [ label [ class "block text-sm font-medium text-gray-700 mb-1" ] [ text "Language" ]
                            , select [ class "input" ]
                                [ option [ value "english" ] [ text "English (L, R, F)" ]
                                , option [ value "swedish" ] [ text "Swedish (V, H, G)" ]
                                , option [ value "french" ] [ text "French (G, D, A)" ]
                                ]
                            ]
                        , div []
                            [ label [ class "block text-sm font-medium text-gray-700 mb-1" ] [ text "Commands" ]
                            , input [ class "input", type_ "text", placeholder "Enter commands...", value model.commands ] []
                            ]
                        ]
                    ]
                ]
            ]
        ]
