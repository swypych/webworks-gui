/*
 * Copyright 2013 BlackBerry Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var root = __dirname + "/../../",
    fs = require("fs"),
    cp = require("child_process"),
    path = require("path"),
    create = require(root + "bin/lib/create"),
    mockResponse = {
        send: jasmine.createSpy()
    };

describe("create", function () {
    beforeEach(function () {
        spyOn(console, "log");
    });

    afterEach(function () {
        mockResponse.send.reset();
    });

    it("calls webworks-cli create if cmd exists", function () {
        spyOn(fs, "existsSync").andReturn(true);
        spyOn(cp, "exec").andCallFake(function (execStr, callback) {
            callback();
        });

        create({
            query: {
                args: "hellow1"
            },
        }, mockResponse);

        expect(fs.existsSync).toHaveBeenCalled();
        expect(cp.exec).toHaveBeenCalled();
        console.log(cp.exec.mostRecentCall.args);
        expect(cp.exec.mostRecentCall.args[0]).toMatch(/webworks-cli[\\\/]bin[\\\/]webworks\screate\shellow1/);
        expect(mockResponse.send).toHaveBeenCalledWith(200, jasmine.any(Object));
    });

    it("sends 500 if webworks-cli create cmd does not exist", function () {
        spyOn(fs, "existsSync").andReturn(false);
        spyOn(cp, "exec");

        create({
            query: {
                args: ""
            },
        }, mockResponse);

        expect(fs.existsSync).toHaveBeenCalled();
        expect(cp.exec).not.toHaveBeenCalled();
        expect(mockResponse.send).toHaveBeenCalledWith(500, jasmine.any(Object));
    });
});

