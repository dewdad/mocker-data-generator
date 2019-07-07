if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;
            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }
            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;
            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            function sameValueZero(x, y) {
                return (x === y ||
                    (typeof x === 'number' &&
                        typeof y === 'number' &&
                        isNaN(x) &&
                        isNaN(y)));
            }
            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                // c. Increase k by 1.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                k++;
            }
            // 8. Return false
            return false;
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXktaW5jbHVkZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXJyYXktaW5jbHVkZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxDQUFFLEtBQUssQ0FBQyxTQUFpQixDQUFDLFFBQVEsRUFBRTtJQUNwQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFO1FBQy9DLEtBQUssRUFBRSxVQUFTLGFBQWEsRUFBRSxTQUFTO1lBQ3BDLHNDQUFzQztZQUN0QyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ2QsTUFBTSxJQUFJLFNBQVMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO2FBQ3ZEO1lBRUQsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRXRCLGdEQUFnRDtZQUNoRCxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQTtZQUUxQixnQ0FBZ0M7WUFDaEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFO2dCQUNYLE9BQU8sS0FBSyxDQUFBO2FBQ2Y7WUFFRCxzQ0FBc0M7WUFDdEMsa0VBQWtFO1lBQ2xFLElBQU0sQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUE7WUFFdkIsb0JBQW9CO1lBQ3BCLGtCQUFrQjtZQUNsQixpQkFBaUI7WUFDakIsd0JBQXdCO1lBQ3hCLDRCQUE0QjtZQUM1QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFFbkQsU0FBUyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLE9BQU8sQ0FDSCxDQUFDLEtBQUssQ0FBQztvQkFDUCxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVE7d0JBQ2xCLE9BQU8sQ0FBQyxLQUFLLFFBQVE7d0JBQ3JCLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ1IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2hCLENBQUE7WUFDTCxDQUFDO1lBRUQsMkJBQTJCO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRTtnQkFDWiw0REFBNEQ7Z0JBQzVELHFFQUFxRTtnQkFDckUsc0JBQXNCO2dCQUN0QixJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLEVBQUU7b0JBQ3BDLE9BQU8sSUFBSSxDQUFBO2lCQUNkO2dCQUNELENBQUMsRUFBRSxDQUFBO2FBQ047WUFFRCxrQkFBa0I7WUFDbEIsT0FBTyxLQUFLLENBQUE7UUFDaEIsQ0FBQztLQUNKLENBQUMsQ0FBQTtDQUNMIn0=