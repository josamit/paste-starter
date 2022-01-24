const nonDeterministicAttributes = [
  "aria-labelledby",
  "aria-describedby",
  "id",
  "data-enter",
];

/**
 * Examples to remove
 * aria-labelledby="ChevronDownIcon-21" and aria-describedby="5"
 */

const isNonDeterministic = (value) => {
  return (
    value !== undefined &&
    value !== null &&
    (value.match(/(^[a-zA-Z-]+-[a-z0-9]+)/) || value.trim().length === 0)
  );
};

module.exports = {
  test: (val) => {
    if (val && val.attributes) {
      if (
        nonDeterministicAttributes.some((attr) =>
          isNonDeterministic(val.getAttribute(attr))
        )
      ) {
        return true;
      }
    }

    return false;
  },
  print: (val, serialize) => {
    nonDeterministicAttributes.forEach((attr) => {
      if (isNonDeterministic(val.getAttribute(attr))) {
        val.removeAttribute(attr);
      }
    });

    return serialize(val);
  },
};
