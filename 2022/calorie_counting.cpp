#include <iostream>
#include <cmath>
#include <algorithm>
#include <iomanip>
#include <vector>

using namespace std;
typedef long long ll;

int main() {
    ios_base::sync_with_stdio(false);
    string s;
    vector<ll> ans;
    ll sum = 0;
    while(getline(cin, s)) {
        if(s.length() == 0) {
            ans.push_back(sum);
            sum = 0;
        } else {
            sum += (ll) stoi(s);
        }
    }
    nth_element(ans.begin(), ans.begin() + 3, ans.end() + 1, greater<ll>());
    // for(ll item: ans) {
    //     cout << item << ' ';
    // }
    cout << (ans[0] + ans[1] + ans[2]);
    return 0;
}