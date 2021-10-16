const rewire = require("rewire")
const Board = rewire("./Board")
const indexIsSafe = Board.__get__("indexIsSafe")
const arraysAreTheSame = Board.__get__("arraysAreTheSame")
const evaluateCell = Board.__get__("evaluateCell")
// @ponicode
describe("indexIsSafe", () => {
    test("0", () => {
        let callFunction = () => {
            indexIsSafe(-1, 4)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            indexIsSafe(0, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            indexIsSafe(0, 0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            indexIsSafe(10, 50)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            indexIsSafe(0, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            indexIsSafe(-Infinity, -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("arraysAreTheSame", () => {
    test("0", () => {
        let param1 = [[1, 10, 1], [1, 1, 1000], [1000, 1000, 1000]]
        let param2 = [[false, true, true], [true, false, false], [false, true, false]]
        let callFunction = () => {
            arraysAreTheSame(param1, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param1 = [[10, 10, 1], [1, 10, 1000], [1000, 1, 1000]]
        let param2 = [[false, false, false], [true, false, true], [false, false, false]]
        let callFunction = () => {
            arraysAreTheSame(param1, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param1 = [[1000, 1, 1000], [1, 1000, 10], [10, 1000, 10]]
        let param2 = [[true, true, false], [false, true, true], [false, true, false]]
        let callFunction = () => {
            arraysAreTheSame(param1, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param1 = [[1, 1000, 1000], [1000, 1000, 1000], [10, 10, 1000]]
        let param2 = [[true, false, true], [true, false, true], [false, false, false]]
        let callFunction = () => {
            arraysAreTheSame(param1, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param1 = [[1000, 10, 1000], [1, 1000, 10], [10, 1, 10]]
        let param2 = [[false, true, true], [false, true, true], [false, false, false]]
        let callFunction = () => {
            arraysAreTheSame(param1, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            arraysAreTheSame(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("evaluateCell", () => {
    test("0", () => {
        let callFunction = () => {
            evaluateCell(true, 4)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            evaluateCell(false, 3.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            evaluateCell(true, 2.5)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            evaluateCell(false, 3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            evaluateCell(false, 2.5)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            evaluateCell(false, Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
