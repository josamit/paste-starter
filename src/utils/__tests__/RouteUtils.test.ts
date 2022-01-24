import { getCurrentPathHash, getCurrentPathname } from "@src/utils/RouteUtils";

describe("RouteUtils ", () => {
  it("should getCurrentPathname when window object exists", async () => {
    // noinspection JSConstantReassignment
    global.window = Object.create(window);
    const pathname = "/test/dummy/location";
    Object.defineProperty(window, "location", {
      value: {
        pathname,
      },
    });
    expect(getCurrentPathname()).toEqual(pathname);
  });

  it("should getCurrentPathname when window object doesn't exist", async () => {
    // @ts-ignore
    delete window.location;

    expect(getCurrentPathname()).toEqual("");
  });

  it("should getCurrentPathHash when window object doesn't exist", async () => {
    // @ts-ignore
    delete window.location;

    expect(getCurrentPathHash()).toEqual("");
  });

  it("should getCurrentPathHash when window object exists", async () => {
    // noinspection JSConstantReassignment
    global.window = Object.create(window);
    const pathname = "/test/dummy/location";
    const hash = "halisdx9sdhflq38skfx";
    Object.defineProperty(window, "location", {
      value: {
        pathname,
        hash,
      },
    });

    expect(getCurrentPathHash()).toEqual(hash);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
