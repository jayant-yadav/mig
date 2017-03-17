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
// This API receives the "operation" parameter, unmarshalls into interface and returns its marshall
func actionSerialize(respWriter http.ResponseWriter, request *http.Request) {

resource := cljs.New(loc)
defer func() {
		if e := recover(); e != nil {
			emsg := fmt.Sprintf("%v", e)
			ctx.Channels.Log <- mig.Log{OpID: opid, Desc: emsg}.Err()
			resource.SetError(cljs.Error{Code: fmt.Sprintf("%.0f", opid), Message: emsg})
			respond(http.StatusInternalServerError, resource, respWriter, request)
		}
		ctx.Channels.Log <- mig.Log{OpID: opid, Desc: "leaving updateInvestigator()"}.Debug()
	}()

	err = request.ParseForm()
	if err != nil {
		panic(err)
	}

// extract parameters and unmarshall
postAction := request.FormValue("parameters")
var parameters map[string]interface{}
		err = json.Unmarshal([]byte(postAction), &parameters)
		if err != nil {
			panic(err)
		}
		fmt.Println(parameters) //parameters has decoded data

// Marshall the data here:

 response, _ := json.Marshal(parameters)

// THis is response. change it acc to action
		err = resource.AddItem(cljs.Item{
		Href: fmt.Sprintf("%s/investigator?investigatorid=%.0f", ctx.Server.BaseURL, inv.ID),
		Data: []cljs.Data{{Name: "Investigator ID " + fmt.Sprintf("%.0f", inv.ID), Value: inv}},
	})
	respond(http.StatusCreated, resource, respWriter, request)

}
