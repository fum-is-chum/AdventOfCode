#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>
#include <fstream>

using namespace std;

unordered_map<char, int> sumBags = {
    {'r', 12},
    {'g', 13},
    {'b', 14},

};

pair<int, char> getBagValue(const string &bag)
{
    // find digits
    int start = 0;
    int end = 1;
    for (; end < bag.size(); end++)
    {
        if (bag[end] == ' ')
        {
            break;
        }
    }

    return pair<int, char>(stoi(bag.substr(start, end - start)), bag[end + 1]);
}

// pair<pos, gameId>
pair<int, int> getGameId(string &game)
{
    const int start = 5;
    int end = 6;

    // find ':'
    for (; end < game.size(); end++)
    {
        if (game[end] == ':')
        {
            break;
        }
    }

    return pair<int, int>(end, stoi(game.substr(start, end - start)));
}

bool isGamePossible(string &bag, int &pos)
{
    int start = pos + 2;
    int end = start + 2;
    int len = bag.size();
    for (; end < len; end++)
    {
        if (bag[end] == ',' || bag[end] == ';' || end == len - 1)
        {
            pair<int, char> bagValue = getBagValue(bag.substr(start, end - start));
            // cout << bagValue.first << ' ' << bagValue.second << '\n';
            // validate bagValue
            if (bagValue.first > sumBags[bagValue.second])
            {
                return false;
            }
            start = end + 2;
            end = start + 2;
        }
    }
    return true;
}

vector<string> readFile(string path)
{
    vector<string> lines;
    string line;
    ifstream file(path);

    if (file.is_open())
    {
        while (getline(file, line))
        {
            lines.push_back(line);
        }
        file.close();
    }
    else
    {
        cout << "Unable to open file";
    }

    return lines;
}

int main()
{
    vector<string> lines = readFile("input.txt");
    int sum = 0;
    for (string &line : lines)
    {
        pair<int, int> gameData = getGameId(line);
        if (isGamePossible(line, gameData.first))
        {
            // cout << gameData.second << ' ' << true << '\n';
            sum += gameData.second;
        }
        else
        {
            cout << false << '\n';
        }
    }

    cout << sum << '\n';
    return 0;
}