package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
    "html"
    "log"

	"github.com/jvehent/cljs"
	"mig.ninja/mig"
	"mig.ninja/mig/pgp"
)
// This API receives the "operation" parameter and marshalls it the way actin/create API wants it and POSTs it
func actionValidate(respWriter http.ResponseWriter, request *http.Request) {

	err = request.ParseForm()
	if err != nil {
		panic(err)
	}

postAction := request.FormValue("parameters")
var parameters map[string]interface{}
if err := json.Unmarshal(byt, &parameters); err != nil {
        panic(err)
    }
    fmt.Println(parameters)

		postAction := request.FormValue("parameters")
		err = json.Unmarshal([]byte(postAction), &parameters)
		if err != nil {
			panic(err)
		}

}
