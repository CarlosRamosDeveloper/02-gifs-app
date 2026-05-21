import { describe, expect, test } from "vitest";

import { getGifsByQuery } from "../../../src/gifs/actions/get-gifs-by-query.action"

describe("Get gifs by query", () => {
    test("should return a list of gifs", async () => {
        const gifs = await getGifsByQuery("Golden sun")
        const [testSubject] = gifs

        expect(testSubject).toStrictEqual({
            id: expect.any(String),
            height: expect.any(Number),
            width: expect.any(Number),
            title: expect.any(String),
            url: expect.any(String)
        })      
        expect(gifs.length).toBe(5)
    })
})