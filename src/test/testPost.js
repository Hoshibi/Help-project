import getPost from './post'

describe('Post', () => {
  const var1 = 'testing the posts'

  test('getPost should be a function', () => {
    expect(getPost).toBeInstanceOf(Function)
  })

  test(`getPost(${var1}) should return "true"`, () => {
      const actual = getPost(var1)
      const expected = 'ok'

      expect(actual).toBe(expected)
    }
  )
})

describe('Post', () => {
  test('getPost should thrown an TypeError', () => {
    try {
      getPost()
    } catch (error) {
      expect(error.name).toBe('TypeError')
    }
  })
})