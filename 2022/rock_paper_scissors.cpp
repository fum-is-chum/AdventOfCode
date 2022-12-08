#include <iostream>
#include <cmath>
#include <algorithm>
#include <iomanip>
#include <vector>
#include <map>

using namespace std;
typedef long long ll;

int main() {
    ios_base::sync_with_stdio(false);
    /*
        A = X = Rock
        B = Y = Paper
        C = Z = Scissor

        A > C
        B > A
        C > B
    */
    map<char, int> chrMapping = {
        {'X', 'A'},
        {'Y', 'B'},
        {'Z', 'C'}
    };
    map<char, int> score = {
        {'A', 1},
        {'B', 2},
        {'C', 3}
    };

    map<pair<char, int>, char> mapping = {
        {make_pair('A', 0), 'C'},
        {make_pair('A', 3), 'A'},
        {make_pair('A', 6), 'B'},

        {make_pair('B', 0), 'A'},
        {make_pair('B', 3), 'B'},
        {make_pair('B', 6), 'C'},

        {make_pair('C', 0), 'B'},
        {make_pair('C', 3), 'C'},
        {make_pair('C', 6), 'A'},
    };
    // unordered_map<string, int> gameResult = {
    //     {"A Z", 0},
    //     {"A X", 3},
    //     {"A Y", 6},

    //     {"B Z", 6},
    //     {"B X", 0},
    //     {"B Y", 3},

    //     {"C Z", 3},
    //     {"C X", 6},
    //     {"C Y", 0}
    // };
    
    map<char, int> intendedResult = {
        {'Z', 6},
        {'X', 0},
        {'Y', 3},
    };
    
    
    ll ans = 0;
    string s;
    while(getline(cin, s)) {
        // cout << intendedResult[(char)s[2]] << ' ' << score[mapping[make_pair(s[0], intendedResult[s[2]])]] << '\n';
        ans += intendedResult[(char)s[2]] + score[mapping[make_pair(s[0], intendedResult[s[2]])]];
    }
    cout << ans;
    return 0;
}