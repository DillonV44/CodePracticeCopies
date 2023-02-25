class Solution(object):
    def romanToInt(self, s):
     checks = {"IV":-2,"IX":-2, "XL":-20, "XC":-20, "CD":-200, "CM":-200}
     values = {"I":1, "V":5,"X":10, "L":50,"C":100, "D":500,"M":1000}
     sum = 0

     for i in s:
        sum += values[i]

     for i in range(len(s) - 1):
        combine = str(s[i] + s[i + 1])
        if combine in checks:
            sum += checks[combine]

     return sum