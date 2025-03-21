module Utils.Robot exposing (..)

import Utils.Language exposing (Language(..))


commandMap : Language -> ( String, String, String )
commandMap lang =
    case lang of
        English ->
            ( "L", "R", "F" )

        Swedish ->
            ( "V", "H", "G" )

        French ->
            ( "G", "D", "A" )
