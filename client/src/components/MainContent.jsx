import "./App.css";

function MainContent() {
  return (
    <main>
      <section className="main-content">
        <section>
          <div className="main-text">
            <h1>Ready to listen to some stories?</h1>
            <div>
              Crafting a story is not difficult anymore. Give us new ideas and
              we will generate a creative story for you. Lets craft some new
              ideas into beautiful stories together.
            </div>
          </div>
          <div className="main-form">
            <form action="">
              <h2>Lets Craft Stories</h2>
              <div className="voice-type">
                <label htmlFor="voice">Select Voice</label>
                <select name="voice" id="voice">
                  <option value="">Voice</option>
                  <option value="type1">type1</option>
                  <option value="type2">type2</option>
                  <option value="type3">type3</option>
                </select>
              </div>
              <div className="language">
                <label htmlFor="language">Select Language</label>
                <select name="language" id="language">
                  <option value="">Language</option>
                  <option value="english">English</option>
                  <option value="urdu">Urdu</option>
                  <option value="spanish">Spanish</option>
                </select>
              </div>
              <div>
                <label htmlFor="description">Prompt your description</label>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>

              <button onClick={handleDownloadAudio}>Create Now!</button>
              {audioData && (
                <audio controls>
                  <source src={audioData} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}

export default MainContent;